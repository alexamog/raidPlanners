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

INSERT INTO users(user_id,user_name,user_avatar,user_discriminator) VALUES('100319324333432832', 'Seisname','a57b03dcb179eb2ca827f55fbb828b08','8162');
INSERT INTO users(user_id,user_name,user_avatar,user_discriminator) VALUES('165897917004120064', 'Lenny','2795e49b4d786de5cf5953cf592c1b4f','8080');

CREATE USER 'raid-user'@'%' IDENTIFIED BY 'raiduser-0000';
GRANT ALL PRIVILEGES ON raid.* TO 'raid-user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;