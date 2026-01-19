import { useState, useEffect } from 'react';
import { supabase, LoanApplication } from '../lib/supabase';
import {
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Error loading applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        app.first_name.toLowerCase().includes(term) ||
        app.last_name.toLowerCase().includes(term) ||
        app.phone.includes(term) ||
        app.department.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const updateStatus = async (id: string, newStatus: LoanApplication['status']) => {
    try {
      const { error } = await supabase
        .from('loan_applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      await loadApplications();

      if (selectedApp?.id === id) {
        const updated = applications.find(app => app.id === id);
        if (updated) {
          setSelectedApp({ ...updated, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('loan_applications')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await loadApplications();
    } catch (err) {
      console.error('Error updating notes:', err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('loan_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDeleteConfirm(null);
      if (selectedApp?.id === id) {
        setSelectedApp(null);
      }
      await loadApplications();
    } catch (err) {
      console.error('Error deleting application:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      reviewing: 'bg-blue-100 text-blue-800 border-blue-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };

    const labels = {
      pending: 'Pendiente',
      reviewing: 'En Revisión',
      approved: 'Aprobado',
      rejected: 'Rechazado'
    };

    const icons = {
      pending: Clock,
      reviewing: Eye,
      approved: CheckCircle,
      rejected: XCircle
    };

    const Icon = icons[status as keyof typeof icons];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        <Icon className="w-3.5 h-3.5" />
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    reviewing: applications.filter(app => app.status === 'reviewing').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 shadow-sm" style={{ backgroundColor: '#f1eff6ff', borderBottom: '3px solid #009900' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-4">
              <img
                src="/logocentro.png"
                alt="COPEBA"
                className="h-12 object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-black">Panel de Administración</h1>
                <p className="text-sm mt-1" style={{ color: '#090909ff' }}>Gestión de solicitudes de préstamos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadApplications}
                className="flex items-center gap-2 px-4 py-2 text-black rounded-lg transition hover:opacity-80"
                style={{ backgroundColor: 'rgba(7, 249, 19, 0.9)' }}
              >
                <RefreshCw className="w-4 h-4" />
                Actualizar
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition hover:opacity-80"
                style={{ backgroundColor: 'rgba(26, 4, 168, 0.9)' }}
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: '#011c6b' }}>
            <div className="text-sm font-medium text-gray-600">Total</div>
            <div className="text-3xl font-bold mt-2" style={{ color: '#011c6b' }}>{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="text-sm font-medium text-gray-600">Pendientes</div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: '#011c6b' }}>
            <div className="text-sm font-medium text-gray-600">En Revisión</div>
            <div className="text-3xl font-bold mt-2" style={{ color: '#011c6b' }}>{stats.reviewing}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: '#009900' }}>
            <div className="text-sm font-medium text-gray-600">Aprobados</div>
            <div className="text-3xl font-bold mt-2" style={{ color: '#009900' }}>{stats.approved}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-sm font-medium text-gray-600">Rechazados</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, teléfono o departamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending">Pendiente</option>
                  <option value="reviewing">En Revisión</option>
                  <option value="approved">Aprobado</option>
                  <option value="rejected">Rechazado</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Cargando solicitudes...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron solicitudes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ubicación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(app.created_at).toLocaleDateString('es-GT')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {app.first_name} {app.last_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {app.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {app.municipality}, {app.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          {app.loan_amount}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="font-medium text-sm hover:opacity-80 transition"
                            style={{ color: '#009900' }}
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(app.id)}
                            className="font-medium text-sm text-red-600 hover:text-red-800 transition"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Eliminar solicitud</h2>
            <p className="text-gray-600 text-center mb-6">¿Está seguro de que desea eliminar esta solicitud? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteApplication(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 flex justify-between items-center sticky top-0" style={{ backgroundColor: '#009900' }}>
              <h2 className="text-xl font-bold text-white">Detalles de la Solicitud</h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre completo</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {selectedApp.first_name} {selectedApp.last_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Teléfono</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedApp.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Departamento</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedApp.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Municipio</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedApp.municipality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Monto solicitado</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedApp.loan_amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Propósito del crédito</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedApp.loan_purpose}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Fuente de ingresos</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedApp.income_source}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Método de contacto</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedApp.contact_method}</p>
                </div>
                 {selectedApp.nearest_agency && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Agencia más cercana</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{selectedApp.nearest_agency}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500">Fecha de solicitud</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {new Date(selectedApp.created_at).toLocaleString('es-GT')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Estado actual</label>
                  <div className="mt-1">{getStatusBadge(selectedApp.status)}</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Cambiar estado</label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'pending')}
                    className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition text-sm font-medium"
                  >
                    Pendiente
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'reviewing')}
                    className="px-4 py-2 rounded-lg transition text-sm font-medium text-white"
                    style={{ background: '#011c6b' }}
                  >
                    En Revisión
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'approved')}
                    className="px-4 py-2 rounded-lg transition text-sm font-medium text-white"
                    style={{ background: '#009900' }}
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'rejected')}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition text-sm font-medium"
                  >
                    Rechazar
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
                  Notas internas
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={selectedApp.notes || ''}
                  onChange={(e) => setSelectedApp({ ...selectedApp, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Agregue notas sobre esta solicitud..."
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateNotes(selectedApp.id, selectedApp.notes || '')}
                    className="px-4 py-2 text-white rounded-lg transition text-sm font-medium"
                    style={{ backgroundColor: '#009900' }}
                  >
                    Guardar notas
                  </button>
                  <button
                    onClick={() => {
                      setSelectedApp(null);
                      setDeleteConfirm(selectedApp.id);
                    }}
                    className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition text-sm font-medium flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
