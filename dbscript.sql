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




/*
      得意・不得意
*/


drop view v_bunyamap_groupby_vendor cascade;
CREATE VIEW v_bunyamap_groupby_vendor AS
select
    a.vendor_nm,
    b.bunya_cd,
    b.bunya_nm,
    b.kensu,
    b.ryaku_nm
from
    (select distinct vendor_nm from toko union select '左の表から企業名を選択してください。') a,
    (select  1 bunya_cd,'住民基本台帳'   bunya_nm , trunc(random()*25) kensu , '住基' ryaku_nm union all 
     select  2 bunya_cd,'選挙人名簿管理' bunya_nm , trunc(random()*10) kensu , '選挙' ryaku_nm union all 
     select  3 bunya_cd,'固定資産税'     bunya_nm , trunc(random()*25) kensu , '固定' ryaku_nm union all 
     select  4 bunya_cd,'個人住民税'     bunya_nm , trunc(random()*15) kensu , '民税' ryaku_nm union all 
     select  5 bunya_cd,'軽自動車税'     bunya_nm , trunc(random()*15) kensu , '軽自' ryaku_nm union all 
     select  6 bunya_cd,'国民健康保険'   bunya_nm , trunc(random()*15) kensu , '国保' ryaku_nm union all 
     select  7 bunya_cd,'国民年金'       bunya_nm , trunc(random()* 5) kensu , '年金' ryaku_nm union all 
     select  8 bunya_cd,'障害者福祉'     bunya_nm , trunc(random()*15) kensu , '障害' ryaku_nm union all 
     select  9 bunya_cd,'後期高齢者医療' bunya_nm , trunc(random()* 5) kensu , '後期' ryaku_nm union all 
     select 10 bunya_cd,'介護保険'       bunya_nm , trunc(random()*15) kensu , '介護' ryaku_nm union all 
     select 11 bunya_cd,'児童手当'       bunya_nm , trunc(random()*15) kensu , '児童' ryaku_nm union all 
     select 12 bunya_cd,'生活保護'       bunya_nm , trunc(random()* 5) kensu , '生保' ryaku_nm union all 
     select 13 bunya_cd,'健康管理'       bunya_nm , trunc(random()*15) kensu , '健康' ryaku_nm union all 
     select 14 bunya_cd,'就学援助'       bunya_nm , trunc(random()*10) kensu , '就学' ryaku_nm union all 
     select 15 bunya_cd,'財務会計'       bunya_nm , trunc(random()*25) kensu , '財務' ryaku_nm union all 
     select 16 bunya_cd,'起債管理'       bunya_nm , trunc(random()* 5) kensu , '起債' ryaku_nm union all 
     select 17 bunya_cd,'備品管理'       bunya_nm , trunc(random()*10) kensu , '備品' ryaku_nm union all 
     select 18 bunya_cd,'財産管理'       bunya_nm , trunc(random()*15) kensu , '財産' ryaku_nm union all 
     select 19 bunya_cd,'公会計'         bunya_nm , trunc(random()*10) kensu , '公会' ryaku_nm union all 
     select 20 bunya_cd,'行政評価'       bunya_nm , trunc(random()* 5) kensu , '行政' ryaku_nm union all 
     select 21 bunya_cd,'実施計画'       bunya_nm , trunc(random()*15) kensu , '実計' ryaku_nm union all 
     select 22 bunya_cd,'源泉徴収'       bunya_nm , trunc(random()*15) kensu , '源泉' ryaku_nm union all 
     select 23 bunya_cd,'人事給与'       bunya_nm , trunc(random()*25) kensu , '給与' ryaku_nm union all 
     select 24 bunya_cd,'人事評価'       bunya_nm , trunc(random()* 5) kensu , '評価' ryaku_nm union all 
     select 25 bunya_cd,'文書管理'       bunya_nm , trunc(random()*25) kensu , '文書' ryaku_nm union all 
     select 26 bunya_cd,'旅費管理'       bunya_nm , trunc(random()*10) kensu , '旅費' ryaku_nm union all 
     select 27 bunya_cd,'庶務事務'       bunya_nm , trunc(random()*15) kensu , '庶務' ryaku_nm union all 
     select 28 bunya_cd,'グループウェア' bunya_nm , trunc(random()*25) kensu , 'ＧＷ' ryaku_nm union all 
     select 29 bunya_cd,'水道料金'       bunya_nm , trunc(random()*10) kensu , '水道' ryaku_nm union all 
     select 30 bunya_cd,'企業会計'       bunya_nm , trunc(random()* 5) kensu , '企業' ryaku_nm) b
;

select * from v_bunyamap_groupby_vendor;


