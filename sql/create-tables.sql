CREATE TABLE `computer_showcase_forms`.`sab_form_submission` (
  `sab_form_submission_id` INT NOT NULL AUTO_INCREMENT,
  `date_submitted` DATETIME,
  `uniqname` VARCHAR(45) NOT NULL,
  `is_medical_student` VARCHAR(45) NULL,
  `medical_school_code` VARCHAR(45) NULL,
  `phone_number` VARCHAR(45) NULL,
  `subtotal` VARCHAR(45) NULL,
  `tax` VARCHAR(45) NULL,
  `total` VARCHAR(45) NULL,
  `rms_transaction` VARCHAR(45) NULL,
  `register` VARCHAR(45) NULL,
  PRIMARY KEY (`sab_form_submission_id`));
