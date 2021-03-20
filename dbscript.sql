CREATE TABLE toko (
    vendor_nm character varying(100) ,
    system_nm character varying(100) ,
    dantai_nm character varying(100) ,
    tokosha_nm character varying(100),
    rank1 integer NOT NULL,
    comment1 character varying(200),
    rank2 integer NOT NULL,
    comment2 character varying(200),
    ymdt timestamp without time zone 
);

