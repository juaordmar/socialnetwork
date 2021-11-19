DELIMITER //
CREATE OR REPLACE TRIGGER limiteFotos
    BEFORE INSERT ON Photos
    FOR EACH ROW
    BEGIN
        DECLARE numUserPhotos INT;
        SET numUserPhotos = (SELECT COUNT(*) FROM Photos WHERE userId = NEW.userId);
        if (numUserPhotos > 49) then SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
            'A user cannot upload more than 50 photos';
        END IF;
    END//
DELIMITER ;