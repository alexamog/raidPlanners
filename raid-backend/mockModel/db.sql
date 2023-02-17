create database raidDB;
use raidDB;

create table hangouts (
    hID               int  not null auto_increment,
    hAuthor   varchar( 16) not null,
    hTitle    varchar( 16) not null,
    hDesc     varchar(128),
    hStartDT      datetime not null,
    hEndDT        datetime not null,
    hLocation varchar(128),

    primary key (hangoutID)
);

create table users (
    userID            int not null,
    userName varchar(128) unique not null,

    primary key (userID)
);

insert into users (userID, userName)
values (000000000000000000, 'user0#0000');