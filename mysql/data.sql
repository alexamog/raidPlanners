CREATE DATABASE raid;

FLUSH PRIVILEGES;

USE raid;

CREATE TABLE users(
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_avatar VARCHAR(255),
    user_discriminator VARCHAR(5) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE hangouts(
    hangout_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    hangout_title VARCHAR(32) NOT NULL,
    hangout_description VARCHAR(128) NOT NULL,
    hangout_date DATETIME NOT NULL,
    hangout_location VARCHAR(128) NOT NULL,
    PRIMARY KEY (hangout_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE attendees(
    attendees_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    hangout_id INT NOT NULL,
    PRIMARY KEY (attendees_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (hangout_id) REFERENCES hangouts(hangout_id)
);

INSERT INTO users(user_id,user_name,user_avatar,user_discriminator) VALUES('100319324333432832', 'Seisname','a57b03dcb179eb2ca827f55fbb828b08','8162');
INSERT INTO hangouts(user_id, hangout_title, hangout_description, hangout_date, hangout_location) VALUES("100319324333432832", "Raid Hangout", "Lets raid and game", "2023-02-25T13:00", "My place!");

INSERT INTO attendees(user_id, hangout_id) VALUES("100319324333432832", 1);
CREATE USER 'raid-user' @'%' IDENTIFIED BY 'raiduser-0000';

GRANT ALL PRIVILEGES ON raid.* TO 'raid-user' @'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
