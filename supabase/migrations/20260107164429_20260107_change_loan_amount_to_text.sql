/*
  # Change loan_amount column type to text

  1. Changes
    - Alter `loan_amount` column from numeric to text
    - Reason: Storing loan amount ranges (e.g., "Q 1,000 - Q 5,000") instead of single values
*/

ALTER TABLE loan_applications
ALTER COLUMN loan_amount TYPE text USING loan_amount::text;
