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

CREATE TABLE toko_radar (
    vendor_nm character varying(100) ,
    system_nm character varying(100) ,
    dantai_nm character varying(100) ,
    tokosha_nm character varying(100),
    hyoka_shubetu integer,
    hyoka_value integer,
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


/*
|| トップの左上のグリッドに使われる。
|| アンケートの「他者の回答から選択」プルダウンにも使われる。
*/
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





/*
|| アンケートの「他者の回答から選択」プルダウンに使われる。
*/
drop view v_toko_groupby_system cascade;
CREATE VIEW v_toko_groupby_system AS
select
    system_nm,
    count(1) kensu,
    round(avg(rank1),2) rank1_avg
from
    toko
group by
    system_nm
;

select * from v_toko_groupby_system;








/*
|| レーダーチャートでの７軸評価に使われる。
*/
drop view v_tokoradar_groupby_vendor cascade;
CREATE VIEW v_tokoradar_groupby_vendor AS
select
    main.vendor_nm,
    sum(CASE
            WHEN main.hyoka_shubetu = 1 THEN main.hyoka_value
            ELSE 0
        END) / sub1.kensu AS shubetu1_avg,
    sum(CASE
            WHEN main.hyoka_shubetu = 2 THEN main.hyoka_value
            ELSE 0
        END) / sub1.kensu AS shubetu2_avg,
    sum(CASE
            WHEN main.hyoka_shubetu = 3 THEN main.hyoka_value
            ELSE 0
        END) / sub1.kensu AS shubetu3_avg,
    sum(CASE
            WHEN main.hyoka_shubetu = 4 THEN main.hyoka_value
            ELSE 0
        END) / sub1.kensu AS shubetu4_avg,
    sum(CASE
            WHEN main.hyoka_shubetu = 5 THEN main.hyoka_value
            ELSE 0
        END) / sub1.kensu AS shubetu5_avg,
    sum(CASE
            WHEN main.hyoka_shubetu = 6 THEN main.hyoka_value
            ELSE 0
        END) / sub1.kensu AS shubetu6_avg,
    sum(CASE
            WHEN main.hyoka_shubetu = 7 THEN main.hyoka_value
            ELSE 0
        END) / sub1.kensu AS shubetu7_avg
from
    toko_radar main,
    (select
        vendor_nm,
        count(1) kensu
    from
        toko_radar
    where
        hyoka_shubetu = 1
    group by
        vendor_nm
    ) sub1
where
    main.vendor_nm = sub1.vendor_nm
group by
    main.vendor_nm,
    sub1.kensu
;

select * from v_tokoradar_groupby_vendor;
