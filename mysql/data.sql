CREATE DATABASE raid;
FLUSH PRIVILEGES;
USE raid;

CREATE TABLE hangouts(
    hangout_id INT NOT NULL AUTO_INCREMENT,
    hangout_authorId VARCHAR(255) NOT NULL,
    hangout_title VARCHAR(32) NOT NULL,
    hangout_description VARCHAR(128) NOT NULL,
    hangout_date DATETIME NOT NULL,
    hangout_location VARCHAR(128) NOT NULL,
    PRIMARY KEY (hangout_id)
);

CREATE TABLE users(
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_avatar VARCHAR(255) NOT NULL,
    user_discriminator VARCHAR(5) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE attendees(
    attendees_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    hangout_id INT NOT NULL,
    PRIMARY KEY (attendees_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (hangout_id) REFERENCES hangouts(hangout_id)    
);

CREATE USER 'raid-user'@'%' IDENTIFIED BY 'raiduser-0000';
GRANT ALL PRIVILEGES ON raid.* TO 'raid-user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;