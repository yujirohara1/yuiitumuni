CREATE TABLE toko (
    vendor_nm character varying(100) ,
    system_nm character varying(100) ,
    dantai_nm character varying(100) ,
    tokosha_nm character varying(100),
    rank1 integer,
    comment1 character varying(200),
    rank2 integer,
    comment2 character varying(200),
    ymdt timestamp without time zone 
);

/*
|| デモデータ作成
*/
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('富士通','IPナレッジ',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('富士通','IPナレッジ',1,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('富士通','IPナレッジ',2,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('富士通','IPナレッジ',3,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('富士通','IPナレッジ',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('富士通','IPナレッジ',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('富士通','IPナレッジ',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('富士通','IPナレッジ',2,CURRENT_DATE);

insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NEC','GPRIME',2,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NEC','GPRIME',3,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NEC','GPRIME',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NEC','GPRIME',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NEC','GPRIME',2,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NEC','GPRIME',2,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NEC','GPRIME',3,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NEC','GPRIME',3,CURRENT_DATE);

insert into toko (vendor_nm,system_nm,rank1,ymdt) values('マイクロソフト','Office365',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('マイクロソフト','Office365',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('マイクロソフト','Office365',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('マイクロソフト','Office365',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('マイクロソフト','Office365',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('マイクロソフト','Office365',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('マイクロソフト','Office365',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('マイクロソフト','Office365',4,CURRENT_DATE);


insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NTTデータ','総合行政システムXYZ',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NTTデータ','総合行政システムXYZ',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NTTデータ','総合行政システムXYZ',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NTTデータ','総合行政システムXYZ',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NTTデータ','総合行政システムXYZ',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NTTデータ','総合行政システムXYZ',4,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NTTデータ','総合行政システムXYZ',5,CURRENT_DATE);
insert into toko (vendor_nm,system_nm,rank1,ymdt) values('NTTデータ','総合行政システムXYZ',4,CURRENT_DATE);


drop view v_toko_groupby_vendor cascade;
CREATE VIEW v_toko_groupby_vendor AS
select
    vendor_nm,
    count(1) kensu,
    round(avg(rank1),2) rank1_avg
from
    toko
group by
    vendor_nm
;

select * from v_toko_groupby_vendor;
