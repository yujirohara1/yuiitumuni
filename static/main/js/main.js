var DELIMIT = "@|@|@";

$(document).ready(function() {

    try{
        $('#btnNanajikuQuestion').attr("disabled","disabled");
        $('#btnTokuiBunyaQuestion').attr("disabled","disabled");
        
        $.getJSON("/getVendorNmList", function(json) {
            list = JSON.parse(json.data);
            $.each(list, function(i, item) {
                $('#selVendorNm .dropdown-menu').append('<li><a onclick=$("#txtVendorNm").val("' + item.vendor_nm + '");>'+item.vendor_nm);
            });
        });
    
        $.getJSON("/getSystemNmList", function(json) {
            list = JSON.parse(json.data);
            $.each(list, function(i, item) {
                $('#selSystemNm .dropdown-menu').append('<li><a onclick=$("#txtSystemNm").val("' + item.system_nm + '");>'+item.system_nm);
            });
        });

        $.each(TODOHUKEN, function(i, item) {
            var option = $('<option>').text(item).val(i);
            $('#selTodohuken').append(option);
        });

        createTokoTables_Main();
        createJissekiTables_Main();
        createKoeTables_Main();
        CreateRadarChart() //行選択していないが空白のレーダーチャートを作っておく。
        createBunyaMap();
        createBarChartKibo();
        createTodohuken();

    }catch(e){

    }
    return;
});


//
//
//$('#btnListHenko').on('click', function() {
//    $('#tableCustomerListHenko').hide();
//    $('#modalUpdList').modal();
//});
//
//
//$('#btnMap').on('click', function() {
//    //$('#tableCustomerListHenko').hide();
//    var jusho = $('#txtAddress1').val().trim();
//    if(jusho ==""){
//        jusho = "日本";
//    }
//    $('#ifrMap').attr('src', "https://www.google.com/maps/embed/v1/place?key=AIzaSyD9DDk6NPmQjOlhOMTuP9vYLf5ryu7vk4w&q=" + jusho); 
//    //src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD9DDk6NPmQjOlhOMTuP9vYLf5ryu7vk4w&q=新潟市西区内野西2-21-2-3"
//    $('#modalMap').modal();
//});
//
//
//function createListHenkoTables_Main(){
//    $('#divUpdateListReserveArea').html("&nbsp;");
//    var groupkb = $("#selGroupKb").val();
//    if(groupkb == undefined) {
//      groupkb = 100;
//    }
//
//    //pageScrollPos = $('#tableCustomerListHenko')[0].parentElement.scrollTop;
//    
//    var table = $('#tableCustomerListHenko').DataTable( {
//            bInfo: false,
//            bSort: true,
//            destroy: true,
//            ajax: {
//                url: "/getCustomer_Main/" + groupkb + "/" + 1 + "",
//                dataType: "json",
//                dataSrc: function ( json ) {
//                    return JSON.parse(json.data);
//                },
//                contentType:"application/json; charset=utf-8",
//                complete: function () {
//                    return; 
//                }
//            },
//            columns: [
//                { data: 'list'      ,width: '30%' ,  className: 'dt-body-center'},
//                { data: 'id'        ,width: '5%'},
//                { data: 'name1'     ,width: '30%'},
//                { data: 'address1'  ,width: '35%'}
//            ],
//            rowReorder: {
//                dataSrc: 'list',
//            },
//            "aoColumnDefs": [
//                { 'bSortable': false, 'aTargets': [ 0 ] },
//                { 'bSortable': false, 'aTargets': [ 1 ] },
//                { 'bSortable': false, 'aTargets': [ 2 ] },
//                { 'bSortable': false, 'aTargets': [ 3 ] }
//             ],
//            "processing": true,
//            language: {
//               url: "../static/main/js/japanese.json"
//            },
//            "scrollY":        "300",
//            "pageLength": 1000,
//            searching: false,
//            paging: false,
//            "order": [ 0, "asc" ],
//            "fnRowCallback": function( nRow, row, iDisplayIndex, iDisplayIndexFull ) {
//                    if(toNumber(row.list) != toNumber(row.address3)){
//                        $('td:eq(0)', nRow).html( row.list + "（変更前：" + toNumber(row.address3) + "）" );
//                        nRow.style.backgroundColor = "#ffefe0";
//                    }else{
//                        nRow.style.backgroundColor = "";
//                    }
//            },
//            "drawCallback": function (settings) {
//                //$('div.dataTables_scrollBody').scrollTop(pageScrollPos);
//                //$('#tableCustomerListHenko')[0].parentElement.scrollTop = scrpos;
//            }
//    } );
//
//    $('#tableCustomerListHenko').show();
//}
//
//
////$('#tableCustomerListHenko')[0].parentElement.onscroll = function(){
////    // windowがスクロールされた時に実行する処理
////    alert(1);
////}
//
//function createListMukoTables_Main(){
//    $('#divUpdateListReserveArea').html("&nbsp;");
//    var groupkb = $("#selGroupKb").val();
//    if(groupkb == undefined) {
//      groupkb = 100;
//    }
//    
//    var table = $('#tableCustomerListMuko').DataTable( {
//            bInfo: false,
//            bSort: true,
//            destroy: true,
//            ajax: {
//                url: "/getCustomer_Main/" + groupkb + "/" + 0 + "",
//                dataType: "json",
//                dataSrc: function ( json ) {
//                    return JSON.parse(json.data);
//                },
//                contentType:"application/json; charset=utf-8",
//                complete: function () {
//                    return; 
//                }
//            },
//            columns: [
//                { data: 'id'        ,width: '20%'},
//                { data: 'name1'     ,width: '50%'},
//                { data: 'address3'  ,width: '30%'}
//            ],
//            "processing": true,
//            language: {
//               url: "../static/main/js/japanese.json"
//            },
//            "scrollY":        "300",
//            "pageLength": 1000,
//            searching: true,
//            paging: false,
//            "order": [[ 2, "desc" ],[ 0, "desc" ]],
//        dom:"<'row'<'col-sm-12'tr>>" +
//            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
//            "<'row'<'col-sm-5'i><'col-sm-7'p>>"
//    } );
//
//    $('#tableCustomerListMuko').show();
//}
//
//
//
//$('#modalUpdList').on("shown.bs.modal", function (e) {
//    $('#guideListHenko').html("①配達順を変更したいデータの「氏名」をダブルクリック<br>②移動させたい位置でシングルクリック");
//    createListHenkoTables_Main();
//    createListMukoTables_Main();
//});
//
//
//$('#modalSeikyuKanri').on("shown.bs.modal", function (e) {
//    $('#btnSeikyuIkkatuCreate').remove();
//    $('#btnSeikyuIkkatuDelete').remove();
//    $('#btnSeikyuIkkatuPrint').remove();
//    $('#progressDivSeikyuPrint').hide();
//    $('#progressParentDivSeikyuPrint').hide();
//    $('#progressDivSeikyuPrint').text("");
//    
//    createSeikyuKanriTable_Sub();
//    createSeikyuKanriCsutomerTable_Sub(0, 0)
//});
//  
//
//$('#tableSeikyuKanri tbody').on( 'click', 'tr', function () {
//    //顧客テーブルから指定したレコード
//    var rowData =   $('#tableSeikyuKanri').DataTable().row( this ).data();
//    var nen = rowData.nengetu.split(".")[0];
//    var tuki = rowData.nengetu.split(".")[1];
//    $('#btnSeikyuIkkatuCreate').remove();
//    $('#btnSeikyuIkkatuDelete').remove();
//    $('#btnSeikyuIkkatuPrint').remove();
//    if(rowData.getugaku==0 && rowData.ninzu==0){
//        $('#divSeikyuMeisaiOrButton2').hide();
//        var btnTag = "";
//        btnTag = btnTag + '<a href="#" ';
//        btnTag = btnTag + ' id="btnSeikyuIkkatuCreate" ';
//        btnTag = btnTag + ' onclick="funcSeikyuIkkatuCreate(-1,'+ nen + "," + tuki +')" ';
//        btnTag = btnTag + ' class="btn btn-primary btn-lglg" ';
//        btnTag = btnTag + ' role="button">' + nen + '年' + tuki + '月の請求データを作成する。' + '</a>';
//        $('#divSeikyuMeisaiOrButton').append(btnTag);
//    }else{
//        $('#divSeikyuMeisaiOrButton2').show();
//        // 削除ボタンを作成
//        var btnTag = "";
//        btnTag = btnTag + '<a href="#" ';
//        btnTag = btnTag + ' id="btnSeikyuIkkatuDelete" ';
//        btnTag = btnTag + ' onclick="funcSeikyuIkkatuSakujo(-1,'+ nen + "," + tuki +')" ';
//        btnTag = btnTag + ' class="btn btn-danger btn-sm" ';
//        btnTag = btnTag + ' role="button">' + nen + '年' + tuki + '月分を全て削除' + '</a>';
//        $('#divSeikyuDeleteAll').append(btnTag);
//
//        // 印刷ボタンを作成
//        btnTag = "";
//        btnTag = btnTag + '<a href="#" ';
//        btnTag = btnTag + ' id="btnSeikyuIkkatuPrint" ';
//        btnTag = btnTag + ' onclick="funcSeikyuIkkatuPrint(-1,'+ nen + "," + tuki +')" ';
//        btnTag = btnTag + ' class="btn btn-success btn-sm" ';
//        btnTag = btnTag + ' role="button">' + nen + '年' + tuki + '月分をプレビュー' + '</a>';
//        $('#divSeikyuPrintAll').append(btnTag);
//    }
//    createSeikyuKanriCsutomerTable_Sub(nen, tuki)
//  } );
//  
//  /* 請求データ一括作成 */
//  /* 30秒ルールに間に合わないかもしれず、ここだけ非同期ループにする。印刷と同じ仕組み。 */
//  function funcSeikyuIkkatuCreate(customerid,nen, tuki){
//    tuki = ('00'+tuki).slice(-2);
//    $('#btnSeikyuIkkatuCreate').attr("disabled","disabled");
//    //CreateSeikyuData(customerid, nen + "" + tuki, false) // ←従来の一括処理。これを１件ずつの連続通信に変更する。
//    //$('#progressSeikyuPrint').show();
//    $('#progressDivSeikyuPrint').show();
//    $('#progressParentDivSeikyuPrint').show();
//    $('#progressDivSeikyuPrint').text("");
//    files = [];
//    index = 0;
//    blReady = false;
//    CreateSeikyuDataRenzoku(customerid, nen + "" + tuki, false);  // ←変更後
//    //createSeikyuKanriCsutomerTable_Sub(nen, tuki)
//  }
//
//  function funcSeikyuIkkatuSakujo(customerid,nen, tuki){
//    tuki = ('00'+tuki).slice(-2);
//    if (confirm("本当に削除してよろしいですか？")) {
//            $('#btnSeikyuIkkatuDelete').attr("disabled","disabled");
//            CreateSeikyuData(customerid, nen + "" + tuki, true)
//            createSeikyuKanriCsutomerTable_Sub(nen, tuki)
//        } else {
//        }
//  }
//
//
//  var files = [];
//  var index = 0;
//  var blReady = false;
//  function funcSeikyuIkkatuPrint(customerid, nen, tuki){
//    if (confirm("請求書をプレビューします。よろしいですか？")) {
//        $('#btnSeikyuIkkatuPrint').attr("disabled","disabled");
//        //$('#progressSeikyuPrint').show();
//        $('#progressDivSeikyuPrint').show();
//        $('#progressParentDivSeikyuPrint').show();
//        $('#progressDivSeikyuPrint').text("");
//    files = [];
//        index = 0;
//        blReady = false;
//        if(toNumber($(".row_selected.seikyuKanri2").find("td:eq(0)").text())!=0){
//            tokutei = toNumber($(".row_selected.seikyuKanri2").find("td:eq(0)").text());
//        }else{
//            tokutei = customerid;
//        }
//        
//        PrintSeikyu(tokutei, nen, tuki);
//    } else {
//    }
//}
//
//
//
///*
//|| 請求書印刷
//*/
//function PrintSeikyu(customerid, nen, tuki) {
//    //$("#progressSeikyuPrint").val(0);
//    $("#progressDivSeikyuPrint").css( "width", "0%" );
//    $('#progressDivSeikyuPrint').text("");
//    $('#progressPrintSeikyuPercent').show();
//
//    var randnum = Math.floor(Math.random()*10101010101)
//
//    var tmpPrint = function (dummyA, dummyB, rowNo, rowSize) {
//        $.ajax({
//            type: "GET",
//            url: "/printSeikyu/" + dummyA + "/" + dummyB + "/" + nen + ('00'+tuki).slice(-2) + "/" + randnum + "",
//        }).done(function(data) {
//            if(data=="-1"){
//
//            }else{
//                files.push(data);
//                //var currentNum = toNumber($("#myProgress").val());
//                var nowProgress = Math.floor((rowNo / rowSize) * 100);
//                // $("#progressSeikyuPrint").val( nowProgress );
//                $("#progressDivSeikyuPrint").css( "width", nowProgress+"%" );
//                $("#progressDivSeikyuPrint").text( nowProgress+"%" );
//                $('#progressPrintSeikyuPercent').html("PDFを作成しています。");
//            }
//            //if(dummyA==999999999){
//            if(files.length == Math.ceil(rowSize/2)){
//                blReady = true;
//            }
//        }).fail(function(data) {
//            alert("エラー：" + data.statusText);
//        }).always(function(data) {
//        });
//    }
//    if(customerid=="-1"){
//        var table = $('#tableSeikyuKanriCustomer').DataTable();
//        var rowSize = $('#tableSeikyuKanriCustomer').DataTable().rows().data().length;
//        var Asan=0;
//        $.each(table.rows().data(), function(i, row){
//            if(Asan==0 && (i+1)==rowSize){ //最終レコードでAが空白の場合１人でも実行する
//                Asan = row.customer_id;
//                tmpPrint(Asan, 0, i, rowSize);
//            }else if(Asan==0){
//                Asan = row.customer_id;
//            }else{
//                tmpPrint(Asan, row.customer_id, i, rowSize);
//                Asan = 0;
//            }
//        });
//        //for(var i=1; i<1000; i++){
//        //    tmpPrint(i);
//         //}
//    } else{
//        tmpPrint(customerid, 0, 1, 1);
//    }
//    //setTimeout( tmpPrint(999999999, 999999999, 99, 100), 100 );
//    MergePdfExecute();
////}
//}
//
//function MergePdfExecute() {
//    if ( !blReady ) {
//        setTimeout( MergePdfExecute, 100 ); // wait 100ms and execute sample_func() again
//        return;
//    }
//
//    //$('#progressSeikyuPrint').hide();
//    $('#progressDivSeikyuPrint').hide();
//    $('#progressParentDivSeikyuPrint').hide();
//    $('#progressDivSeikyuPrint').text("");
//    $('#progressPrintSeikyuPercent').html("ファイルをダウンロードしています...");
//    
//    //1000人分のPDFファイル名をクライアントから伝えて、マージPDFをもらう
//    $.ajax({
//        type: "POST",
//        data: JSON.stringify({"data":files}),
//        url: "/pdfMergeSeikyusho",
//        contentType:'application/json'
//    }).done(function(data) {
//        var blob=new Blob([data], {type: "application/pdf"});//
//        var link = document.createElement('a');
//        link.href = window.URL.createObjectURL(blob);
//        link.download = "" + Math.random().toString(32).substring(2) + ".pdf";
//        link.click();
//    }).fail(function(data) {
//        alert("エラー：" + data.statusText);
//    }).always(function(data) {
//        $('#btnSeikyuIkkatuPrint').removeAttr("disabled");
//        setTimeout("$('#progressPrintSeikyuPercent').hide(); $('#progressPrintSeikyuPercent').html('')", 3000);
//    });
//
//}
//
//
//
//function CreateSeikyuDataRenzoku(customerid, nentuki, sakujonomi){
//    //$("#progressSeikyuPrint").val(0);
//    $("#progressDivSeikyuPrint").css( "width", "0%" );
//    $('#progressDivSeikyuPrint').text("");
//    $('#progressPrintSeikyuPercent').show();
//    // var tmpPrint = function (dummyA, dummyB, rowNo, rowSize) {
//    //     $.ajax({
//    //         type: "GET",
//    //         url: "/printSeikyu/" + dummyA + "/" + dummyB + "/" + nen + ('00'+tuki).slice(-2) + "/" + randnum + "",
//    //     }).done(function(data) {
//    //         if(data=="-1"){
//
//    //         }else{
//    //             files.push(data);
//    //             //var currentNum = toNumber($("#myProgress").val());
//    //             var nowProgress = Math.floor((rowNo / rowSize) * 100);
//    //             $("#progressSeikyuPrint").val( nowProgress );
//    //             $('#progressPrintSeikyuPercent').html("PDFを作成しています。（" + nowProgress + "％）");
//    //         }
//    //         //if(dummyA==999999999){
//    //         if(files.length == Math.ceil(rowSize/2)){
//    //             blReady = true;
//    //         }
//    //     }).fail(function(data) {
//    //         alert("エラー：" + data.statusText);
//    //     }).always(function(data) {
//    //     });
//    // }
//    // if(customerid=="-1"){
//    //     var table = $('#tableSeikyuKanriCustomer').DataTable();
//    //     var rowSize = $('#tableSeikyuKanriCustomer').DataTable().rows().data().length;
//    //     var Asan=0;
//    //     $.each(table.rows().data(), function(i, row){
//    //         if(Asan==0 && (i+1)==rowSize){ //最終レコードでAが空白の場合１人でも実行する
//    //             Asan = row.customer_id;
//    //             tmpPrint(Asan, 0, i, rowSize);
//    //         }else if(Asan==0){
//    //             Asan = row.customer_id;
//    //         }else{
//    //             tmpPrint(Asan, row.customer_id, i, rowSize);
//    //             Asan = 0;
//    //         }
//    //     });
//    //     //for(var i=1; i<1000; i++){
//    //     //    tmpPrint(i);
//    //      //}
//    // } else{
//    //     tmpPrint(customerid, 0, 1, 1);
//    // }
//    // //setTimeout( tmpPrint(999999999, 999999999, 99, 100), 100 );
//    var tmpInsert = function (customerid, nentuki, rowNo, rowSize){
//        $.ajax({
//            type: "GET",
//            url: "/createSeikyu/" + customerid + "/" + nentuki + "/false"
//        }).done(function(data) {
//            if(data=="-1"){
//        
//            }else{
//                files.push(data);
//                //var currentNum = toNumber($("#myProgress").val());
//                var nowProgress = Math.floor((rowNo / rowSize) * 100);
//                //$("#progressSeikyuPrint").val( nowProgress );
//                $("#progressDivSeikyuPrint").css( "width", nowProgress+"%" );
//                $("#progressDivSeikyuPrint").text( nowProgress+"%" );
//                $('#progressPrintSeikyuPercent').html("請求データを作成中...");
//            }
//            if(rowNo == rowSize){
//                blReady = true;
//            }
//
//        }).fail(function(data) {
//            alert("エラー：" + data.statusText);
//        }).always(function(data) {
//            //何もしない
//        });
//    }
//    
//    $.getJSON("/getDaichoCustomer_SeikyuSub", function(json) {
//        list = JSON.parse(json.data);
//        $.each(list, function(i, item) {
//            tmpInsert(item.id, nentuki, i, list.length-1);
//        });
//    });
//
//    SeikyuInsertComplete();
//}
//
//function SeikyuInsertComplete() {
//    if ( !blReady ) {
//        setTimeout( SeikyuInsertComplete, 100 ); // wait 100ms and execute sample_func() again
//        return;
//    }
//
//    //$('#progressSeikyuPrint').hide();
//    $('#progressDivSeikyuPrint').hide();
//    $('#progressParentDivSeikyuPrint').hide();
//    $('#progressDivSeikyuPrint').text("");
//    $('#progressPrintSeikyuPercent').html("作成完了しました。");
//    createSeikyuKanriTable_Sub();
//    setTimeout("$('#progressPrintSeikyuPercent').hide(); $('#progressPrintSeikyuPercent').html('')", 3000);
//
//}
//
//
//
//
//
//
//function CreateSeikyuData(customerid, nentuki, sakujonomi){
//
//    $.ajax({
//        type: "GET",
//        url: "/createSeikyu/" + customerid + "/" + nentuki + "/" + sakujonomi + ""
//    }).done(function(data) {
//        if(customerid == -1 && sakujonomi == false){
//            $('#btnSeikyuIkkatuCreate').text("作成しました！");
//            setTimeout('$("#btnSeikyuIkkatuCreate").remove();', 3000);
//            createSeikyuKanriTable_Sub();
//        }else if(customerid == -1 && sakujonomi == true){
//            $('#btnSeikyuIkkatuDelete').text("削除しました。");
//            setTimeout('$("#btnSeikyuIkkatuDelete").remove();', 3000);
//            createSeikyuKanriTable_Sub();
//        }else{
//            createSeikyuTables_Main(customerid,nentuki);
//        }
//    }).fail(function(data) {
//        alert("エラー：" + data.statusText);
//    }).always(function(data) {
//        //何もしない
//    });
//}
//
///*
//|| 請求管理サブ画面 顧客ごとレコード表示 v_seikyu_b　
//*/
//function createSeikyuKanriCsutomerTable_Sub(nen, tuki){
//  
//    var groupkb = $("#selGroupKb").val();
//    if(groupkb == undefined) {
//      groupkb = 100;
//    }
//
//    $('#tableSeikyuKanriCustomer').DataTable({
//        bInfo: false,
//        bSort: true,
//        destroy: true,
//        "processing": true,
//        ajax: {
//            url: "/getSeikyuNengetuCustomer_Main/" + nen + "/" + tuki + "/" + groupkb,
//            dataType: "json",
//            dataSrc: function ( json ) {
//                return JSON.parse(json.data);
//            },
//            contentType:"application/json; charset=utf-8",
//            complete: function () {
//                return; 
//            }
//        },
//        columns: [
//              { data: 'customer_id'    ,width: '10%',  className: 'dt-body-left'},
//              { data: 'list'           ,width: '10%',  className: 'dt-body-left'},
//              { data: 'name1'          ,width: '25%',  className: 'dt-body-left'},
//              { data: 'getugaku'       ,width: '15%'   ,className: 'dt-body-right'  ,render: function (data, type, row) { return (data*1).toLocaleString();} },
//              { data: 'zeigaku'        ,width: '15%'   ,className: 'dt-body-right'  ,render: function (data, type, row) { return (data*1).toLocaleString();} },
//              { data: 'max_ymdt'       ,width: '25%',  className: 'dt-body-left',render: function (data, type, row) 
//                { 
//                  if(data==null){
//                      return "未作成";
//                  }else{
//                      return data;
//                  }
//                } 
//              }
//        ],
//        "aoColumnDefs": [
//            { 'bSortable': false, 'aTargets': [ 0 ] },
//            { 'bSortable': false, 'aTargets': [ 1 ] },
//            { 'bSortable': false, 'aTargets': [ 2 ] },
//            { 'bSortable': false, 'aTargets': [ 3 ] },
//            { 'bSortable': false, 'aTargets': [ 4 ] },
//            { 'bSortable': false, 'aTargets': [ 5 ] }
//         ],
//        language: {
//           url: "../static/main/js/japanese.json"
//        },
//        "scrollY":        "300",
//        searching: true,
//        "pageLength": 1000,
//        paging:false,
//        "order": [ 1, "asc" ],
//        "lengthMenu": [100, 300, 500, 1000],
//        dom:"<'row'<'col-sm-12'tr>>" +
//            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
//            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
//      "preDrawCallback": function (settings) {
//        return;
//      },
//      "drawCallback": function (settings) {
//          //$('div.dataTables_scrollBody').scrollTop(pageScrollPos);
//          //$('#tableSeikyuKanri')[0].parentElement.scrollTop = pageScrollPos;
//      }
//    });
//  }
//  
    
    
    
  
/*
|| 請求管理サブ画面　年月グロス表 v_seikyu_c
*/
function createSeikyuKanriTable_Sub(){
  
  $('#tableSeikyuKanri').DataTable({
      bInfo: false,
      bSort: true,
      destroy: true,
      "processing": true,
      ajax: {
          url: "/getSeikyuNengetuShukei_Main",
          dataType: "json",
          dataSrc: function ( json ) {
              return JSON.parse(json.data);
          },
          contentType:"application/json; charset=utf-8",
          complete: function () {
              return; 
          }
      },
      columns: [
          { data: 'nengetu'    ,width: '22%',  className: 'dt-body-left'},
            { data: 'getugaku' ,width: '10%'   ,className: 'dt-body-right'  ,render: function (data, type, row) { return (data*1).toLocaleString();} },
            { data: 'zeigaku'  ,width: '10%'   ,className: 'dt-body-right'  ,render: function (data, type, row) { return (data*1).toLocaleString();} },
            { data: 'ninzu'    ,width: '13%'   ,className: 'dt-body-center'},
            { data: 'max_ymdt'   ,width: '45%',  className: 'dt-body-left',render: function (data, type, row) 
            { 
                if(data==null){
                    return "未作成";
                }else{
                    return data;
                }
            } 
        }
      ],
      "aoColumnDefs": [
          { 'bSortable': false, 'aTargets': [ 0 ] },
          { 'bSortable': false, 'aTargets': [ 1 ] },
          { 'bSortable': false, 'aTargets': [ 2 ] },
          { 'bSortable': false, 'aTargets': [ 3 ] },
          { 'bSortable': false, 'aTargets': [ 4 ] }
       ],
      language: {
         url: "../static/main/js/japanese.json"
      },
      "scrollY":        "300",
      searching: false,
      "pageLength": 1000,
      paging:false,
      "order": [ 0, "desc" ],
      "lengthMenu": [100, 300, 500, 1000],
      dom:"<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
          "<'row'<'col-sm-5'i><'col-sm-7'p>>",
    "preDrawCallback": function (settings) {
      return;
    },
    "drawCallback": function (settings) {
        //$('div.dataTables_scrollBody').scrollTop(pageScrollPos);
        $('#tableSeikyuKanri')[0].parentElement.scrollTop = pageScrollPos;
    }
  });
}

  
  
  
  
  
  
  
  
  
  
  
    
var listChangeTarget = null;

$('#tableCustomerListHenko tbody').on('dblclick', 'tr', function () {
    if (IsNull_ChangeListTarget()==false){
        return;
    }
    
    ReserveHenkoCustomer(this, "#tableCustomerListHenko");
    
} );

$('#tableCustomerListMuko tbody').on('dblclick', 'tr', function () {
    if (IsNull_ChangeListTarget()==false){
        return;
    }
    ReserveHenkoCustomer(this, "#tableCustomerListMuko");
    
} );


/*
|| 左右の表のダブルクリック時にリザーブエリアに一時移動。
*/
function ReserveHenkoCustomer(eventObj, tableId){
    listChangeTarget = null;
    var scrpos = $(tableId)[0].parentElement.scrollTop;
    var table = $(tableId).DataTable();
    var row = table.row(eventObj)
    var data = table.row(eventObj).data();
    var idx = table.row( eventObj ).index();
    table.row(idx).remove().draw();
    var customerName;
    if(data.list != null){
        customerName = data.list + " - " + data.id + " - " + data.name1 + " "
    }else{
        customerName = data.id + " - " + data.name1 + " "
    }
    listChangeTarget = JSON.stringify(data);
    
    var cancelTag;
    if(data.list ==null){
        cancelTag = customerName + "<a href='#' onclick='fncCancel_ListPickUp(" + listChangeTarget + ");'><span class='badge larger-badge'>戻す</span></a>";
    } else {
        cancelTag = customerName + "<a href='#' onclick='fncCancel_ListPickUp(" + listChangeTarget + ");'><span class='badge larger-badge'>戻す</span></a>&nbsp;&nbsp;<a href='#' onclick='fncToMuko_ListPickUp(" + listChangeTarget + ");'><span class='badge larger-badge'>宅配停止</span></a>";
    }
    
    $('#divUpdateListReserveArea').html(cancelTag);
    $(tableId)[0].parentElement.scrollTop = scrpos;
}


/*
|| リザーブエリアに持ってきた顧客情報を「宅配停止」バッジで右の表に移動
*/
function fncToMuko_ListPickUp(rowData){
    var tableMuko = $("#tableCustomerListMuko").DataTable();
    rowData.list = null;
    tableMuko.row.add(rowData).draw();
    $('#divUpdateListReserveArea').html("&nbsp;");
    
    
    var table = $('#tableCustomerListHenko').DataTable();
    var newData = [];
    var targetNum = JSON.parse(listChangeTarget).list;
    
    $.each(table.rows().data(), function(i, row){
    
        if(row.list > targetNum ){
            row.list--;
        }
        newData.push(row);
    });
    
    table.clear().draw();
    
    $.each(newData, function(i, row){
        table.row.add(row);
    });
    table.draw();
}


/*
|| 並び順変更のユーティリティ　
|| 左表：再度連番を振る　　右表：すべてnullとする。
*/
function fncReSortLeftAndRight(){
    var i;
    var tableYuko = $('#tableCustomerListHenko').DataTable();
    var tableMuko = $("#tableCustomerListMuko").DataTable();
    var yukoData = [];
    var mukoData = [];

    //有効テーブルのlistを振りなおす
    i = 1;
    $.each(tableYuko.rows().data(), function(i, row){
        row.list = i;
        yukoData.push(row);
        i++
    });
    //tableYuko.clear();
    
    $.each(yukoData, function(i, row){
        tableYuko.row.add(row);
    });
    //tableYuko.draw();

    //無効テーブルのlistをすべてnull更新
    i = 1;
    $.each(tableMuko.rows().data(), function(i, row){
        row.list = null;
        mukoData.push(row);
        i++
    });
    //tableMuko.clear().draw();
    
    $.each(mukoData, function(i, row){
        tableMuko.row.add(row);
    });
    //tableMuko.draw();
}


/*
|| リザーブエリアに持ってきた顧客情報を「戻す」バッジで元の位置に戻す
*/
function fncCancel_ListPickUp(rowData){
    var tableId = "#tableCustomerListHenko";
    if(rowData.list == null || toNumber(rowData.list) == 0){
        tableId = "#tableCustomerListMuko";
    }
    
    var scrpos = $(tableId)[0].parentElement.scrollTop;
    var table = $(tableId).DataTable();
    table.row.add(rowData).draw();
    $('#divUpdateListReserveArea').html("&nbsp;");
    $(tableId)[0].parentElement.scrollTop = scrpos;
}

/*
|| リザーブエリアが空白かどうかを検査
*/
function IsNull_ChangeListTarget(){
  var str = $('#divUpdateListReserveArea')[0].innerText.trim();
  if(str == " "){
      return true;
  }else if(str == ""){
      return true;
  }else if(str == "&nbsp;"){
      return true;
  }else{
      return false;
  }
}

$('#tableCustomerListHenko tbody').on('click', 'tr', function () {
    if (IsNull_ChangeListTarget()){
        return;
    }

    var scrpos = $('#tableCustomerListHenko')[0].parentElement.scrollTop;
    var table = $('#tableCustomerListHenko').DataTable();
    var selectNum = table.row(this).data().list;
    var ikubekiBasho = 0;
    
    var newData = [];
    var targetNum = JSON.parse(listChangeTarget).list;
    
    // koko
    var clickname = table.row(this).data().name1;
    var targetname = JSON.parse(listChangeTarget).name1;
    if (confirm(targetname + " の宅配順を " + clickname + " の後ろに設定します。よろしいですか？")) {

        $.each(table.rows().data(), function(i, row){
        
            if(targetNum != null){ //アクティブユーザの移動
               if(selectNum > targetNum){ //上にいるデータを下に持っていく場合
                  ikubekiBasho = selectNum;
                  if(selectNum >= row.list && row.list > targetNum ){
                      row.list--;
                  }
               } else if(selectNum+1 == targetNum){ //元の位置に戻す場合
                  ikubekiBasho = selectNum+1;
               } else if(selectNum < targetNum){ //下にいるデータを上に持っていく場合
                  ikubekiBasho = selectNum+1;
                  if(selectNum < row.list && row.list < targetNum ){
                      row.list++;
                  }
               }
            } else { //パッシブユーザの移動（無効データの有効化）
                if(selectNum < row.list){
                    row.list++;
                }
            }
            newData.push(row);
        });
        
        //パッシブユーザの移動では、現在順がnullのためselectNum+1を入れる
        if(targetNum == null){
            ikubekiBasho = selectNum+1;
        }
        
        table.clear().draw();
        
        $.each(newData, function(i, row){
            table.row.add(row);
        });
        
        d = JSON.parse(listChangeTarget);
        d.list = ikubekiBasho;
        table.row.add(d).draw();
        
        $('#tableCustomerListHenko')[0].parentElement.scrollTop = scrpos;
        $('#divUpdateListReserveArea').html("&nbsp;");
    } else {
        return;
    }

} );




$('#btnUpdList').on('click', function() {
    //fncReSortLeftAndRight();
  var sendData = [];
  var table = $('#tableCustomerListHenko').DataTable();
  $.each(table.rows().data(), function(i, row){
    if(toNumber(row.list) != toNumber(row.address3)){
      sendData.push([row.id, row.list]);
    }
  });

  var tableMuko = $('#tableCustomerListMuko').DataTable();
  $.each(tableMuko.rows().data(), function(i, row){
    if(toNumber(row.list) != toNumber(row.address3)){
      sendData.push([row.id, null]);
    }
  });

  if(sendData.length==0){
    $("#modalUpdListMessageArea").append("<p style='color:red'>更新対象のデータがありません。</p>");
    setTimeout('$("#modalUpdListMessageArea")[0].innerText="";', 3000);
      return;
  }

  $('#btnUpdList').attr("disabled","disabled");
  //$('#loading').addClass("spinner-lg");
  //JSON.stringify({"text":$("#input-text").val()});
//    $.ajax({
//   });

   $.ajax({
    type: "POST",
    data: JSON.stringify({"data":sendData}),
    url: "/updTakuhaijun",
    contentType:'application/json'
   }).done(function(data) {
    $("#modalUpdListMessageArea").append("<p style='color:red'>更新しました。</p>");
    setTimeout('$("#modalUpdListMessageArea")[0].innerText="";', 3000);
    createListHenkoTables_Main();
    createListMukoTables_Main();
    createCustomerTables_Main();
    createDaichoTables_Main(0);
    createSeikyuTables_Main(0,$('#selNentuki').val());
   }).fail(function(data) {
    alert("エラー：" + data.statusText);
   }).always(function(data) {
    $('#btnUpdList').removeAttr("disabled");
   });

});



$('#btnSignOut').on('click', function() {
    $.ajax({
        type: "GET",
        url: "/logout/"
       }).done(function(data) {
           var a = data;
       }).fail(function(data) {
           var a = data;
           //alert("エラー：" + data.statusText);
       }).always(function(data) {
           var a = data;
           //$('#btnUpdList').removeAttr("disabled");
      //$('#loading').removeClass("spinner-lg");
        //alert("エaラー：" + data);
    });
});






/*
|| 台帳情報更新
*/
$('#btnDaichoAdd').on('click', function() {
  var customerid = toNumber($(".row_selected.customer").find("td:eq(0)").text());
  var sendParam = customerid + "," +
                  $(".row_selected.addDaicho").find("td:eq(0)").text() + "," +
                  toNumber($("#inpDaichoAddMon").val()) + "," +
                  toNumber($("#inpDaichoAddTue").val()) + "," +
                  toNumber($("#inpDaichoAddWed").val()) + "," +
                  toNumber($("#inpDaichoAddThu").val()) + "," +
                  toNumber($("#inpDaichoAddFri").val()) + "," +
                  toNumber($("#inpDaichoAddSat").val()) + "," +
                  toNumber($("#inpDaichoAddSun").val()) ;
                  
  var tmpTotal = 
    toNumber($("#inpDaichoAddMon").val())+
    toNumber($("#inpDaichoAddTue").val())+
    toNumber($("#inpDaichoAddWed").val())+
    toNumber($("#inpDaichoAddThu").val())+
    toNumber($("#inpDaichoAddFri").val())+
    toNumber($("#inpDaichoAddSat").val())+
    toNumber($("#inpDaichoAddSun").val());
  
  var itemid = toNumber($(".row_selected.addDaicho").find("td:eq(0)").text());
  $("#modalAddDaichoMessageArea")[0].innerText="";
  
  if(tmpTotal==0 && $(".row_selected.addDaicho").find("td:eq(4)").text()==""){
    $("#modalAddDaichoMessageArea").append("<p style='color:red'>本数を入力してください。</p>");
    setTimeout('$("#modalAddDaichoMessageArea")[0].innerText="";', 3000);
    return;
  }
  
  if(itemid==0){
    $("#modalAddDaichoMessageArea").append("<p style='color:red'>商品が選択されていません。</p>");
    setTimeout('$("#modalAddDaichoMessageArea")[0].innerText="";', 3000);
    return;
  }
  
  if(customerid==0){
    $("#modalAddDaichoMessageArea").append("<p style='color:red'>顧客情報が選択されていません。</p>");
    setTimeout('$("#modalAddDaichoMessageArea")[0].innerText="";', 3000);
    return;
  }
  
  $('#btnDaichoAdd').attr("disabled","disabled");
  
  $.ajax({
      type: "GET",
      url: "/updAddDaicho/" + sendParam + ""
    }).done(function(data) {
        $("#modalAddDaichoMessageArea").append("<p style='color:red'>更新しました。</p>");
        setTimeout('$("#modalAddDaichoMessageArea")[0].innerText="";', 3000);
        createDaichoTables_Main(customerid);
        //createItemTables_DaichoSub();
        createItemGroupTables_DaichoSub();
        //createItemTables_DaichoSub("すべて");
    $('#btnDaichoAdd').removeAttr("disabled");
    }).fail(function(data) {
          alert("エラー：" + data.statusText);
    }).always(function(data) {
        $('#btnDaichoAdd').removeAttr("disabled");
    });
});



function toNumber(val){ 
    var vala = (val+"").split(',').join('');
    if(isNaN(parseInt(vala))){
        return 0;
    }
  
    var ret = 0;
    try{
        ret = vala * 1;
    }catch(e){
        ret = 0;
    }
    return ret;
}



function getAllYoubiByNentuki(nen, tuki){
    var ret=[];
    var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ];
    
    for(i=1; i<=31; i++){
        var d = new Date(nen + '/' + tuki + '/' +  ('00'+i).slice(-2));
        ret.push(dayOfWeekStr[d.getDay()]);
    }
    
    return ret;
}




/*
|| メイン下部の請求テーブルを作成
*/
function createSeikyuTables_Main(customerId, nentuki){
    var youbiWa = getAllYoubiByNentuki((nentuki+"").substr(0,4), (nentuki+"").substr(4,2));
    
    // var btnTag = "";
    // btnTag = btnTag + '商品名&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" ';
    // btnTag = btnTag + ' id="btnEditSeikyu" ';
    // btnTag = btnTag + ' onclick="alert(1);" ';
    // btnTag = btnTag + ' class="btn btn-default btn-sm" ';
    // btnTag = btnTag + ' role="button">編集</a>';
    //$('#thSeikyuItemName').append(btnTag);
    //

    $.getJSON("/getCustomer_ById/" + customerId + "", function(json) {
        list = JSON.parse(json.data);
        if (list.length==1){
            var customerName = list[0].name1;
            var nentukiMoji = (nentuki+"").substr(0,4) + "年 " + (nentuki+"").substr(4,2) + " 月 ";
            var customerNameTag = "<span id='spnCustomerLabel' style='font-size:18px'>" + nentukiMoji + "<br>" + customerName.substr(0,7); + "</span>";
            customerNameTag = customerNameTag + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            customerNameTag = customerNameTag + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            customerNameTag = customerNameTag + '<a id="btnAddSeikyuItem" onclick="funcOpenSeikyuItemDialog(' + (nentuki+"").substr(0,4) + ',' + (nentuki+"").substr(4,2) + ',' + customerId + ');" class="btn btn-default btn-sm" role="button" style="top:-14px;position:relative">商品追加</a>';
            customerNameTag = customerNameTag + '&nbsp;&nbsp;';
            customerNameTag = customerNameTag + '<a id="btnKakute" onclick="updKakute(' + (nentuki+"").substr(0,4) + ',' + (nentuki+"").substr(4,2) + ',' + customerId + ');" class="btn btn-default btn-sm" role="button" style="top:-14px;position:relative">確定</a>';
        } else {
            var customerNameTag = "";
        }
        //請求データテーブルを作成
        $("#tableSeikyu").DataTable({
            bInfo: false,
            bSort: false,
            destroy: true,
            "processing": true,
            ajax: {
                url: "/getVSeikyuA_ByCusotmerIdAndTuki/" + customerId + "/" + nentuki + "",
                dataType: "json",
                dataSrc: function ( json ) {
                    return JSON.parse(json.data);
                },
                contentType:"application/json; charset=utf-8",
                complete: function () {
                    return; 
                }
            },
            columns: [
                { data: 'item_id'     ,width: '7%'},
                { data: 'item_name1'  , title: customerNameTag, width: '34%'},
                { data: 'price'          ,width: '7%'   ,className: 'dt-body-right'  ,render: 
                    function (data, type, row) { 
                        return (data*1).toLocaleString();
                    } 
                },
                { data: 'quantity_d01', title: youbiWa[0]  ,width: '2%'    ,className: 'dt-body-center' ,render:  function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[0] );}},
                { data: 'quantity_d02', title: youbiWa[1]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[1] );}},
                { data: 'quantity_d03', title: youbiWa[2]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[2] );}},
                { data: 'quantity_d04', title: youbiWa[3]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[3] );}},
                { data: 'quantity_d05', title: youbiWa[4]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[4] );}},
                { data: 'quantity_d06', title: youbiWa[5]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[5] );}},
                { data: 'quantity_d07', title: youbiWa[6]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[6] );}},
                { data: 'quantity_d08', title: youbiWa[7]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[7] );}},
                { data: 'quantity_d09', title: youbiWa[8]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[8] );}},
                { data: 'quantity_d10', title: youbiWa[9]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row)  { return getSeikyuQuantityColorFlg(data, row, youbiWa[9] );}},
                { data: 'quantity_d11', title: youbiWa[10]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[10]);}},
                { data: 'quantity_d12', title: youbiWa[11]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[11]);}},
                { data: 'quantity_d13', title: youbiWa[12]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[12]);}},
                { data: 'quantity_d14', title: youbiWa[13]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[13]);}},
                { data: 'quantity_d15', title: youbiWa[14]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[14]);}},
                { data: 'quantity_d16', title: youbiWa[15]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[15]);}},
                { data: 'quantity_d17', title: youbiWa[16]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[16]);}},
                { data: 'quantity_d18', title: youbiWa[17]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[17]);}},
                { data: 'quantity_d19', title: youbiWa[18]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[18]);}},
                { data: 'quantity_d20', title: youbiWa[19]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[19]);}},
                { data: 'quantity_d21', title: youbiWa[20]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[20]);}},
                { data: 'quantity_d22', title: youbiWa[21]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[21]);}},
                { data: 'quantity_d23', title: youbiWa[22]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[22]);}},
                { data: 'quantity_d24', title: youbiWa[23]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[23]);}},
                { data: 'quantity_d25', title: youbiWa[24]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[24]);}},
                { data: 'quantity_d26', title: youbiWa[25]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[25]);}},
                { data: 'quantity_d27', title: youbiWa[26]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[26]);}},
                { data: 'quantity_d28', title: youbiWa[27]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[27]);}},
                { data: 'quantity_d29', title: youbiWa[28]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[28]);}},
                { data: 'quantity_d30', title: youbiWa[29]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[29]);}},
                { data: 'quantity_d31', title: youbiWa[30]  ,width: '2%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return getSeikyuQuantityColorFlg(data, row, youbiWa[30]);}}

            ],
            language: {
               url: "../static/main/js/japanese.json"
            },
            "scrollY":        "150px",
            "pageLength": 1000,
            searching: false,
            info: false,
            paging: false,
            "order": [ 0, "asc" ],
            "lengthMenu": [100, 300, 500, 1000],
            dom:"<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
                "<'row'<'col-sm-5'i><'col-sm-7'p>>"
        });
    
      });

}

function funcOpenSeikyuItemDialog(nen, tuki, customerid){
    //alert(nen + "," + tuki + "," + customerid);
    $('#modalAddSeikyu').modal();
}

var selectCustomerId;
function updKakute(nen, tuki, customerid){
    selectCustomerId=customerid;
    //alert(nen + "," + tuki + "," + customerid);
    //$('#modalAddSeikyu').modal();
    //var deliverymd = nen + "-" + tuki + "-" + niti;
    $.ajax({
        type: "GET",
        url: "/updateKakute/" + nen + "/" + tuki + "/" + customerid + "",
    }).done(function(data) {
        //createKihonSetteiTable_Shosai(param_id);
        //
        pageScrollPos = $('#tableCustomer')[0].parentElement.scrollTop;
        $.each($("#tableCustomer").find("tr"), function(i, row){
            if(row.cells[0].innerText==data){
                var table = $("#tableCustomer").DataTable();
                var newrow = row;//table.row(row)
                var idx = table.row( row ).index();
                var data1 = table.row(idx).data();
                table.row(idx).remove().draw();
                if(data1.kakute_ymdt==null){
                    data1.kakute_ymdt = "a!";
                }else{
                    data1.kakute_ymdt = null;
                }
                
                table.row.add(data1).draw();
                //$(row).addClass('row_selected customer');
            }
        });
        
        $.each($("#tableCustomer").find("tr"), function(i, row){
            if(row.cells[0].innerText==data){
                $(row).addClass('row_selected customer');
            }
        });
        
    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
        //何もしない
    });
}


/*
|| 請求データの臨時追加画面起動[直後]イベント
*/
$('#modalAddSeikyu').on("shown.bs.modal", function (e) {
     createItemTables_SeikyuSub();
 });
 
 


 /*
 || 請求データ臨時追加画面起動[直前]イベント
 */
 $('#modalAddSeikyu').on("show.bs.modal", function (e) {
    var a = $('#tableAddSeikyu').dataTable({
        destroy: true
    });
    a.fnClearTable();
 });
 
 $('#btnSeikyuAdd').on('click', function() {
    var customerid = toNumber($(".row_selected.customer").find("td:eq(0)").text());
    var itemid = toNumber($(".row_selected.addSeikyu").find("td:eq(0)").text()); //アイテムID
    var itemname = $(".row_selected.addSeikyu").find("td:eq(2)").text(); //商品名 
    var itemtanka = toNumber($(".row_selected.addSeikyu").find("td:eq(3)").text()); //単価
    var nentuki = $('#selNentuki').val();
    var nen = (nentuki+"").substr(0,4);
    var tuki = (nentuki+"").substr(4,2);

    var item = {
        'nen':nen,
        'tuki':tuki,
        'customer_id':customerid,
        'item_id':itemid,
        'item_name1':itemname,
        'price':itemtanka
    } ;
    $('#tableSeikyu').dataTable().fnAddData( item ); // DataTable でなく、dataTable 。これはOKなのか？

    $('#modalAddSeikyu').modal("hide");

 });


/*
|| 請求データ臨時追加サブ画面のテーブル作成
*/
function createItemTables_SeikyuSub(){
    
    $('#tableAddSeikyu').DataTable({
        bInfo: false,
        bSort: true,
        destroy: true,
        "processing": true,
        ajax: {
            url: "/getItem_Daicho/すべて",
            dataType: "json",
            dataSrc: function ( json ) {
                return JSON.parse(json.data);
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
            { data: 'id'     ,width: '8%'},
            { data: 'code'   ,width: '12%'},
            { data: 'name1'  ,width: '33%'},
            { data: 'tanka'  ,width: '10%' ,className: 'dt-body-right' ,render: function (data, type, row) { return (data*1).toLocaleString();} },
            { data: null     ,width: '37%' ,render: 
                function (data, type, row) { 
                    //row.id が $('#tableSeikyu').DataTable().rows().data() に含まれるかどうか検査
                    var rows = $('#tableSeikyu').DataTable().rows().data();
                    for(var i=0; i<rows.length; i++){
                        if(rows[i].item_id == row.id){
                            return "登録済み";
                        }
                    }
                    return "";
                }
            }
        ],
        language: {
           url: "../static/main/js/japanese.json"
        },
        "scrollY":$(window).height() * 30 / 100,
        order: [[ 4, "desc" ],[ 1, "asc" ],[ 3, "asc" ]],
        "pageLength": 1000,
        paging: false,
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        "fnRowCallback": function( nRow, row, iDisplayIndex, iDisplayIndexFull ) {
            var rows = $('#tableSeikyu').DataTable().rows().data();
            for(var i=0; i<rows.length; i++){
                if(rows[i].item_id == row.id){
                    //$('td:eq(2)', nRow).html( '<b>1</b>' );
                    nRow.style.backgroundColor = "#ffefe0";
                }
            }
        }
    });
  }
  
  
  


function getSeikyuQuantityColorFlg(val, row, youbiwa){
    var rows = $('#tableDaicho').DataTable().rows().data();
    var teiki=-1;
    for(var i=0; i<rows.length; i++){
        if(rows[i].item_id == row.item_id){
            var ret = ""
            if(youbiwa == "月"){teiki=rows[i].getu; }
            if(youbiwa == "火"){teiki=rows[i].ka;   }
            if(youbiwa == "水"){teiki=rows[i].sui;  }
            if(youbiwa == "木"){teiki=rows[i].moku; }
            if(youbiwa == "金"){teiki=rows[i].kin;  }
            if(youbiwa == "土"){teiki=rows[i].dou;  }
            if(youbiwa == "日"){teiki=rows[i].niti; }

            if(toNumber(teiki)==toNumber(val)){return (val==0 ? '休' : val);} 
        }
    }
    //
    //return "<span style='color:red' title='定期:" + teiki + "'/>" + (val==0 ? '' : (val==null ? '' : val));
    if(teiki == -1){
        return "<span style='color:red' aria-label='今月のみ追加商品 ' data-balloon-pos='left'/>" + (val==0 ? '' : (val==null ? '' : val));
    }else{
        return "<span style='color:red' aria-label='定期なら " + teiki + "' data-balloon-pos='left'/>" + (val==0 ? '休' : (val==null ? '' : val));
    }
}



                        // var flg = getSeikyuQuantityColorFlg(data, row, youbiWa[0]);
                        // if(flg==1){
                        //     return 
                        // }else{
                        //     return (data==0 ? '' : data);
                        // }






















$("#selNentuki").change(function(){
  var customerid = $(".row_selected.customer").find("td:eq(0)").text();
  if(customerid!=0){
    createCustomerTables_Main();
    createDaichoTables_Main(customerid);
    createSeikyuTables_Main(customerid,$('#selNentuki').val());
  }
});





$("#selGroupKb").change(function(){
    createCustomerTables_Main();
});



$("#chkYuko").change(function(){
  if($("#chkYuko").prop("checked") == false){
    if($("#chkMuko").prop("checked") == false){
      $("#chkMuko").prop("checked",true);
    }
  }
  createCustomerTables_Main();
});

$("#chkMuko").change(function(){
  if($("#chkMuko").prop("checked") == false){
    if($("#chkYuko").prop("checked") == false){
      $("#chkYuko").prop("checked",true);
    }
  }
    createCustomerTables_Main();
});


/*
|| 台帳追加サブ画面のテーブル作成
*/

$('#btnItemToroku').on('click', function() {
    if($('#txtItemName1').val()==""){
        $('#itemTorokuMessageArea').text("商品名を入力してください。");
        $('#txtItemName1').focus()
        $("#txtItemName1").css("background-color","#ffeff7");
        //$('#txtItemName1').attr("placeholder","必須入力")
        setTimeout('$("#itemTorokuMessageArea").text("");$("#txtItemName1").css("background-color","");', 3000);
        return;
    }
    
    if(toNumber($('#txtItemTanka').val())==0){
        $('#itemTorokuMessageArea').text("単価を入力してください。");
        $('#txtItemTanka').focus()
        $("#txtItemTanka").css("background-color","#ffeff7");
        setTimeout('$("#itemTorokuMessageArea").text("");$("#txtItemTanka").css("background-color","");', 3000);
        return;
    }
    
    if(toNumber($('#txtItemCode').val())==0){
        $('#itemTorokuMessageArea').text("コードを入力してください。");
        $('#txtItemCode').focus()
        $("#txtItemCode").css("background-color","#ffeff7");
        setTimeout('$("#itemTorokuMessageArea").text("");$("#txtItemCode").css("background-color","");', 3000);
        return;
    }
    //$('#txtItemTanka').val("");
    //$('#txtItemSiire').val("");
    //$('#txtItemOrosi').val("");
    //$('#txtItemCode').val("");

    var param = toNumber($('#txtItemId').val()) + DELIMIT + 
                $('#txtItemCode').val() + DELIMIT + 
                $('#txtItemName1').val() + DELIMIT + 
                toNumber($('#txtItemSiire').val()) + DELIMIT + 
                toNumber($('#txtItemTanka').val()) + DELIMIT + 
                toNumber($('#txtItemOrosi').val()) + DELIMIT + 
                toNumber($('#selItemZeiKb').val()) + DELIMIT + 
                "0";
    
    $.ajax({
        type: "GET",
        url: "/UpdateItem/" + param + ""
      }).done(function(data) {
          //alert(data);
        $('#itemTorokuMessageArea').text("更新しました。");
        setTimeout('$("#itemTorokuMessageArea").text("");', 3000);
        createItemGroupTables_DaichoSub();
        //createItemTables_DaichoSub($('#txtItemName1').val(), true);
        //$('#btnNewItem').click();

    }).fail(function(data) {
            alert("エラー：" + data.statusText);
      }).always(function(data) {
    });
});


/*
|| 商品を修正　ボタンクリック
*/
var itemeditflg = 0;
$('#btnEditItem').on('click', function() {
    var itemid = $(".row_selected.addDaicho").find("td:eq(0)").text();
    var scrY = $('#tableAddDaicho')[0].parentElement.scrollTop;
    funcEditItemClick(itemid, scrY);
});

function funcEditItemClick(itemid, scrollYposition){
    itemeditflg = 1;
    $('#tableAddDaicho')[0].parentNode.style.maxHeight  = "130px";
    $('#tableAddDaicho')[0].parentNode.style.height  = "130px";
    $('#hLblYoubiGotoTakuhaiHonsu').hide();
    $('#txtYoubiGotoTakuhaiHonsu').hide();
    $('#btnDaichoAdd').hide();
    $('#itemInputDiv').show();

    $('#lblShohinEdit').html("<div style='color:red; font-size:16px'>修正する商品を選択し、変更内容を入力後、登録ボタンで更新してください。</div>");

    var table = $('#tableAddDaicho').DataTable();
    table.columns.adjust().draw();

    //var itemid =   $('#tableAddDaicho').DataTable().row( this ).data().id; // 選択データ
    //var itemid = $(".row_selected.addDaicho").find("td:eq(0)").text();

    $.getJSON("/getItem_ById/" + itemid + "", function(json) {
    
    }).done(function(json) {
        list = JSON.parse(json.data);
        if (list.length==1){
            $('#txtItemName1').val(list[0].name1);
            $('#txtItemTanka').val(list[0].tanka);
            $('#txtItemSiire').val(list[0].name2);
            $('#txtItemOrosi').val(list[0].orosine);
            $('#txtItemCode').val(list[0].code);
            $('#txtItemId').val(list[0].id);
            $('#selItemZeiKb').val(list[0].zei_kb);
            $('#txtItemId').attr("disabled","disabled");
        
        } else {
            alert("もう一度やり直してください。");
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
    }).always(function() {
        $.getJSON("/getDaicho_ByItemId/" + itemid + "", function(json) {
        }).done(function(json) {
            list = JSON.parse(json.data);
            if (list.length>=1){
                var txt = "<div style='color:red; font-size:15px'>"
                txt = txt + "この商品は、" + list[0].cname1 + (list.length==1 ? "" : " 他 " + (list.length - 1) + "名") + " が契約しています。<br>";
                txt = txt + "単価を変更した場合、次回以降の請求書作成で新しい単価が適用されます。";
                txt = txt + "</div>";
                
                $('#divKeiyakuCustomers').html(txt);
            }else{
                $('#divKeiyakuCustomers').html("この商品を契約している人はいません。");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
        }).always(function(json) {
        if(itemeditflg==1 && scrollYposition != 0){
            $('#tableAddDaicho')[0].parentElement.scrollTop = scrollYposition;
        }
});
    });
}

/*
|| 新しい商品を追加ボタンクリック
|| btnNewItem
*/
$('#btnNewItem').on('click', function() {
    $('#tableAddDaicho')[0].parentNode.style.maxHeight  = "130px";
    $('#tableAddDaicho')[0].parentNode.style.height  = "130px";
    $('#hLblYoubiGotoTakuhaiHonsu').hide();
    $('#txtYoubiGotoTakuhaiHonsu').hide();
    $('#btnDaichoAdd').hide();
    $('#itemInputDiv').show();

    $('#lblShohinEdit').html("<div style='color:red; font-size:16px'>新しく登録する商品情報を入力してください。</div>");

    var itemname = $(".row_selected.addDaichoGroup").find("td:eq(0)").text();
    if(itemname != "すべて"){
        $('#txtItemName1').val(itemname);
    }
    $('#txtItemName1').select();
    $('#txtItemId').val("");
    $('#txtItemTanka').val("");
    $('#txtItemSiire').val("");
    $('#txtItemOrosi').val("");
    $('#txtItemCode').val("");

    $('#txtItemId').attr("disabled","disabled");

    var table = $('#tableAddDaicho').DataTable();
    table.columns.adjust().draw();
    
});

/*
|| 台帳追加サブ画面のテーブル作成
|| アイテムグループ
*/
function createItemGroupTables_DaichoSub(){
    
    $('#tableAddDaichoGroup').DataTable({
        bInfo: false,
        bSort: true,
        destroy: true,
        "processing": true,
        ajax: {
            url: "/getItemGroup_Daicho",
            dataType: "json",
            dataSrc: function ( json ) {
                return JSON.parse(json.data);
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
            { data: 'name1'  ,width: '60%'},
            { data: 'kensu'  ,width: '15%' ,className: 'dt-body-center' },
            { data: null     ,width: '25%' ,className: 'dt-body-right' ,render: 
                function (data, type, row) {
                    if(row.kensu==1){
                        return (row.min_tanka*1).toLocaleString();
                    }else{
                        return (row.min_tanka*1).toLocaleString() + " ～ " + (row.max_tanka*1).toLocaleString();
                    }
                }
            }
        ],
        language: {
           url: "../static/main/js/japanese.json"
        },
        "scrollY":$(window).height() * 40 / 100,
        "pageLength": 1000,
        order: [[ 1, "desc" ],[ 0, "asc" ]],
        paging: false,
        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [ 0 ] },
            { 'bSortable': false, 'aTargets': [ 1 ] },
            { 'bSortable': false, 'aTargets': [ 2 ] }
         ],
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>"
    });
  }
  
  


/*
|| 台帳サブ画面起動[直後]イベント
*/
$('#modalAddDaicho').on("shown.bs.modal", function (e) {
    //$('#tableAddDaichoDiv').show()
    $('#hLblYoubiGotoTakuhaiHonsu').show();
    $('#txtYoubiGotoTakuhaiHonsu').show();
    $('#btnDaichoAdd').show();
    $('#itemInputDiv').hide();
    
    itemeditflg = 0;
    
    $("#inpDaichoAddMon").val("");
    $("#inpDaichoAddTue").val("");
    $("#inpDaichoAddWed").val("");
    $("#inpDaichoAddThu").val("");
    $("#inpDaichoAddFri").val("");
    $("#inpDaichoAddSat").val("");
    $("#inpDaichoAddSun").val("");

    //createItemTables_DaichoSub();
    createItemGroupTables_DaichoSub();
    //createItemTables_DaichoSub("すべて");
});


/*
|| 台帳サブ画面起動[直前]イベント
*/
$('#modalAddDaicho').on("show.bs.modal", function (e) {
   var customerid = toNumber($(".row_selected.customer").find("td:eq(0)").text());
   if(customerid==0){
     $("#mainAddDaichoMessageArea")[0].innerText="";
     $("#mainAddDaichoMessageArea").append("<p style='color:red'>左のリストから顧客を選択してください。</p>");
     setTimeout('$("#mainAddDaichoMessageArea")[0].innerText="";', 3000);
     return false;
   }
   var a = $('#tableAddDaicho').dataTable({
       destroy: true
   });
   a.fnClearTable();
});


/*
|| メイン中央の台帳テーブルを作成
*/
function createDaichoTables_Main(customerId){
    //台帳データテーブルを作成
    var table = $("#tableDaicho").DataTable({
        bInfo: true,
        bSort: false,
        destroy: true,
        "processing": true,
        ajax: {
            url: "/getVDaichoA_ByCusotmerId/" + customerId + "",
            dataType: "json",
            dataSrc: function ( json ) {
                return JSON.parse(json.data);
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
            { data: 'item_id'     ,width: '7%'},
            { data: 'iname1'      ,width: '40%'},
            { data: 'tanka'       ,width: '11%'   ,className: 'dt-body-right'  ,render: function (data, type, row) { return (data*1).toLocaleString();} },
            { data: 'getu'        ,width: '6%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return (data==0 ? '' : data);} },
            { data: 'ka'          ,width: '6%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return (data==0 ? '' : data);} },
            { data: 'sui'         ,width: '6%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return (data==0 ? '' : data);} },
            { data: 'moku'        ,width: '6%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return (data==0 ? '' : data);} },
            { data: 'kin'         ,width: '6%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return (data==0 ? '' : data);} },
            { data: 'dou'         ,width: '6%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return (data==0 ? '' : data);} },
            { data: 'niti'        ,width: '6%'    ,className: 'dt-body-center' ,render: function (data, type, row) { return (data==0 ? '' : data);} }
        ],
        language: {
           url: "../static/main/js/japanese.json"
        },
        "scrollY":        $(window).height() * 32 / 100,
        "pageLength": 1000,
        searching: false,
        info: false,
        paging: false,
        "order": [ 0, "asc" ],
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-5'i><'col-sm-7'p>>"
    });
    try{
        setTimeout(
            "$('#tableDaicho').DataTable().columns.adjust().draw();"
            , 500);
        
    }catch(e){
        console.log(e);
    }
}

function Comma(txt){
    if(txt == ""){
        return;
    }
    txt = txt.replace(",","");

    var num = toNumber(txt)*1;
    return num.toLocaleString();

}

function fncNumOnly(){
    var inp = $(event.srcElement).val();
    inp = inp.replace("０","0");
    inp = inp.replace("１","1");
    inp = inp.replace("２","2");
    inp = inp.replace("３","3");
    inp = inp.replace("４","4");
    inp = inp.replace("５","5");
    inp = inp.replace("６","6");
    inp = inp.replace("７","7");
    inp = inp.replace("８","8");
    inp = inp.replace("９","9");
    var ret = inp.replace(/[‐－―ー]/g, '-').replace(/[^\-\d\.]/g, '').replace(/(?!^\-)[^\d\.]/g, '');
    $(event.srcElement).val(ret);
    // $(event.srcElement).val(ret.toLocaleString());
}

/*
|| メイン左の顧客テーブルを作成
*/
var pageScrollPos = 0;
function createCustomerTables_Main(){
    
  var groupkb = $("#selGroupKb").val();
  if(groupkb == undefined) {
    groupkb = 100;
  }
  
  var yukomuko;
  var Yuko = $("#chkYuko").prop('checked');
  var Muko = $("#chkMuko").prop('checked');
  if(Yuko && Muko){
    yukomuko = 2;
  } else if (Yuko){
    yukomuko = 1;
  } else if (Muko){
    yukomuko = 0;
  }
  
  var nentuki = $('#selNentuki').val();
  var nen = (nentuki+"").substr(0,4) * 1;
  var tuki = (nentuki+"").substr(4,2) * 1;

  pageScrollPos = $('#tableCustomer')[0].parentElement.scrollTop;
  
  $('#tableCustomer').DataTable({
      bInfo: false,
      bSort: true,
      destroy: true,
      "processing": true,
      ajax: {
          url: "/getCustomer_Main/" + groupkb + "/" + yukomuko +  "/" + nen +  "/" + tuki + "",
          dataType: "json",
          dataSrc: function ( json ) {
              return JSON.parse(json.data);
          },
          contentType:"application/json; charset=utf-8",
          complete: function () {
              return; 
          }
      },
      columns: [
          { data: 'id'     ,width: '20%'},
          { data: 'list'   ,width: '25%' ,  className: 'dt-body-center'},
          { data: 'name1'  ,width: '40%'},
          { data: 'kakute_ymdt'     ,width: '15%',render: 
          function (data, type, row) { 
              if(row.kakute_ymdt == null){
                return "";
              }else{
                return "<span class='label label-default'>OK</span>";
              }
          } }
      ],
      aoColumnDefs: [
          { 'bSortable': false, 'aTargets': [ 3 ] }
       ],
      language: {
         url: "../static/main/js/japanese.json"
      },
      "scrollY":        $(window).height() * 35 / 100,
      "pageLength": 1000,
      paging:false,
      "order": [ 1, "asc" ],
      "lengthMenu": [100, 300, 500, 1000],
      dom:"<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
          "<'row'<'col-sm-5'i><'col-sm-7'p>>",
    "preDrawCallback": function (settings) {
      return;
    },
    "drawCallback": function (settings) {
        //$('div.dataTables_scrollBody').scrollTop(pageScrollPos);
        $('#tableCustomer')[0].parentElement.scrollTop = pageScrollPos;
    }
  });
}
$('#tableAddDaichoGroup tbody').on( 'click', 'tr', function () {
    itemeditflg = 0;
    $('#hLblYoubiGotoTakuhaiHonsu').show();
    $('#txtYoubiGotoTakuhaiHonsu').show();
    $('#btnDaichoAdd').show();
    $('#itemInputDiv').hide();
    var row =   $('#tableAddDaichoGroup').DataTable().row( this ).data(); // 選択データ
    //alert(row.name1);aaaaaaaa
    //createItemTables_DaichoSub(row.name1);
});


$('#tableAddDaicho tbody').on( 'click', 'tr', function () {
    var scrY = $('#tableAddDaicho')[0].parentElement.scrollTop;
    $("#inpDaichoAddMon").val("");
    $("#inpDaichoAddMon").select();
    $("#inpDaichoAddMon").css("background-color","#ffeff7");

    $("#inpDaichoAddTue").val("");
    $("#inpDaichoAddWed").val("");
    $("#inpDaichoAddThu").val("");
    $("#inpDaichoAddFri").val("");
    $("#inpDaichoAddSat").val("");
    $("#inpDaichoAddSun").val("");
   
   var row =   $('#tableAddDaicho').DataTable().row( this ).data(); // 選択データ
   var rows = $('#tableDaicho').DataTable().rows().data(); // 台帳データ
   for(var i=0; i<rows.length; i++){
       if(rows[i].item_id == row.id){
           if(rows[i].getu != 0){ $("#inpDaichoAddMon").val(rows[i].getu);}
           if(rows[i].ka   != 0){ $("#inpDaichoAddTue").val(rows[i].ka  );}
           if(rows[i].sui  != 0){ $("#inpDaichoAddWed").val(rows[i].sui );}
           if(rows[i].moku != 0){ $("#inpDaichoAddThu").val(rows[i].moku);}
           if(rows[i].kin  != 0){ $("#inpDaichoAddFri").val(rows[i].kin );}
           if(rows[i].dou  != 0){ $("#inpDaichoAddSat").val(rows[i].dou );}
           if(rows[i].niti != 0){ $("#inpDaichoAddSun").val(rows[i].niti);}
       }
   }

   //alert($('#lblShohinEdit').text());
   if(itemeditflg==1){
        funcEditItemClick(row.id, scrY);
        //$("#btnEditItem").click();
   }
   $('#tableAddDaicho')[0].parentElement.scrollTop = scrY;
   
  
} );



$('#tableCustomer tbody').on( 'click', 'tr', function () {
    //顧客テーブルから指定したレコード
    var rowData =   $('#tableCustomer').DataTable().row( this ).data();
    $('#subAtitle')[0].innerText = rowData.id + "," + rowData.name1 + " " + "へ追加する商品を選択してください。";
    createDaichoTables_Main(rowData.id);
    createSeikyuTables_Main(rowData.id,$('#selNentuki').val());
    $('#txtCustomerName').val(rowData.name1);
    $('#txtCustomerKana').val(rowData.name2);
    $('#txtAddress1').val(rowData.address1);
    $('#txtTel1').val(rowData.tel1);
    $('#selHaraiKb').val(rowData.harai_kb);
    $('#selCustomerGroupKb').val(rowData.group_id);
    $('#selCustomerZeiKb').val(rowData.biko2);
    $('#selTantoName').val(rowData.biko1);
    $('#txtList').val(rowData.list);
    
  } );
  
  

$('#tableSeikyu tbody').on( 'click', 'td', function () {
    if(this.firstChild != null){
        if(this.firstChild.id=="inputQuantityTmp"){
            return;
        }
    }

    

    //事前に子要素（インプットタグ）を削除
    var rowCnt = $('#tableSeikyu')[0].rows.length;
    for(var r=2; r<rowCnt; r++){ //r=0, r=1 はヘッダ
        for(var c=3; c<=33; c++){
            var elCount = $('#tableSeikyu')[0].rows[r].cells[c].childElementCount;
            for(var el=0; el<elCount; el++){
                var chil = $('#tableSeikyu')[0].rows[r].cells[c].children[el];
                var qua;
                if(chil.id == "inputQuantityTmp"){
                    qua = $('#inputQuantityTmp').val();
                } else if(chil.tagName=="SPAN"){
                    qua = chil.innerText;
                }
                $('#tableSeikyu')[0].rows[r].cells[c].removeChild(chil);
                $('#tableSeikyu')[0].rows[r].cells[c].innerText = qua;
                $('#tableSeikyu')[0].rows[r].cells[c].innerHTML = qua;
            }
            // var cell = $('#tableSeikyu')[0].rows[r].cells[c];
            // while(cell.firstChild){
            //     cell.removeChild(cell.firstChild)
            // }
        }
    }
    
    //alert(this);
    //alert(this.cellIndex);
    var row = $('#tableSeikyu').DataTable().row( this ).data();
    var niti = this.cellIndex-2;
    if(!(1<=niti && niti <=31)){
        return;
    }
    var item_id = row.item_id;
    //alert(item_id + "," + niti);
    var inputtag = "";
    var inputtag = inputtag + '<input id="inputQuantityTmp" ';
    var inputtag = inputtag + 'class="form-control input-sm" ';
    var inputtag = inputtag + 'type="text" ';
    var inputtag = inputtag + 'style="width:40px" ';
    var inputtag = inputtag + 'maxlength="3" ';
    var inputtag = inputtag + 'oninput="fncNumOnly();" ';
    var inputtag = inputtag + 'onchange="fncUpdateSeikyuQuantity( ';
    var inputtag = inputtag + '  ' + row.customer_id + ', ';
    var inputtag = inputtag + '  ' + row.item_id + ', ';
    var inputtag = inputtag + '  ' + row.nen + ', ';
    var inputtag = inputtag + '  ' + row.tuki + ', ';
    var inputtag = inputtag + '  ' + niti + ', ';
    var inputtag = inputtag + '  ' + row.price + ', ';
    var inputtag = inputtag + '  ' + row.price_sub + ' ';
    var inputtag = inputtag + ' );" ';
    var inputtag = inputtag + 'value=' + this.innerText + '>';
    //this.html(inputtag);
    $(this).html(inputtag);

    var table = $('#tableSeikyu').DataTable();
 
    //$('#container').css( 'display', 'block' );
    table.columns.adjust().draw();
    $('#inputQuantityTmp').focus()
    $('#inputQuantityTmp').select()

} );
  
function fncUpdateSeikyuQuantity(customerid, itemid, nen, tuki, niti, price, pricesub){
    var deliverymd = nen + "-" + tuki + "-" + niti;
    var quantity = toNumber($("#inputQuantityTmp").val());
    $.ajax({
        type: "GET",
        url: "/updateSeikyuQuantity/" + customerid + "/" + itemid + "/" + deliverymd + "/" + quantity + "/" + price + "/" + pricesub + ""
    }).done(function(data) {
        //alert(data);
        createSeikyuTables_Main(customerid, nen + ("00"+tuki).slice(-2));

    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
        //何もしない
    });
}
  
    

$('#modalKatuyo').on("shown.bs.modal", function (e) {
    createKatuyoTable_Main();
    //createKihonSetteiTable_Shosai("a");
  
});


$('#tableKihonSetteiDetail tbody').on( 'click', 'td', function () {
    if(this.firstChild != null){
        if(this.firstChild.id=="inputTextTmp"){
            return;
        }
    }
    //事前に子要素（インプットタグ）を削除
    var rowCnt = $('#tableKihonSetteiDetail')[0].rows.length;
    for(var r=1; r<rowCnt; r++){ //r=0, r=1 はヘッダ
        for(var c=1; c<=2; c++){
            var elCount = $('#tableKihonSetteiDetail')[0].rows[r].cells[c].childElementCount;
            for(var el=0; el<elCount; el++){
                var chil = $('#tableKihonSetteiDetail')[0].rows[r].cells[c].children[el];
                var qua;
                if(chil.id == "inputTextTmp"){
                    qua = $('#inputTextTmp').val();
                } else if(chil.tagName=="SPAN"){
                    qua = chil.innerText;
                }
                $('#tableKihonSetteiDetail')[0].rows[r].cells[c].removeChild(chil);
                $('#tableKihonSetteiDetail')[0].rows[r].cells[c].innerText = qua;
                $('#tableKihonSetteiDetail')[0].rows[r].cells[c].innerHTML = qua;
            }
        }
    }
    
    var row = $('#tableKihonSetteiDetail').DataTable().row( this ).data();
    if(!(1<=this.cellIndex && this.cellIndex <=2)){
        return;
    }
    var inputtag = "";
    var inputtag = inputtag + '<input id="inputTextTmp" ';
    var inputtag = inputtag + 'class="form-control input-sm" ';
    var inputtag = inputtag + 'type="text" ';
    var inputtag = inputtag + 'style="width:95%" ';
    var inputtag = inputtag + 'maxlength="50" ';
    var inputtag = inputtag + 'onchange="fncUpdateSetteiText( ';
    var inputtag = inputtag + '  \'' + row.param_id + '\', ';
    var inputtag = inputtag + '  \'' + row.param_nm + '\', ';
    var inputtag = inputtag + '  \'' + row.param_no + '\', ';
    var inputtag = inputtag + '  \'' + row.param_val1 + '\', ';
    var inputtag = inputtag + '  \'' + row.param_val2 + '\', ';
    var inputtag = inputtag + '  \'' + this.cellIndex + '\' ';
    var inputtag = inputtag + ' );" ';
    var inputtag = inputtag + 'value=\'' + this.innerText + '\'>';
    //this.html(inputtag);
    $(this).html(inputtag);

    var table = $('#tableKihonSetteiDetail').DataTable();
 
    //$('#container').css( 'display', 'block' );
    table.columns.adjust().draw();
    $('#inputTextTmp').focus()
    $('#inputTextTmp').select()

} );
  
function fncUpdateSetteiText(param_id, param_nm, param_no, param_val1, param_val2, colIndex){
    //var deliverymd = nen + "-" + tuki + "-" + niti;
    var val = $("#inputTextTmp").val();
    $.ajax({
        type: "GET",
        url: "/updateSetteiText/" + param_id + "," + param_nm + "," + param_no + "," + param_val1 + "," + param_val2 + "," + colIndex + "," + val + ""
    }).done(function(data) {
        createKihonSetteiTable_Shosai(param_id);

    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
        //何もしない
    });
}

function ByteSpace(val){
    if(val==""){
        return " ";
    }else{
        return val;
    }
}
function Null2Blank(val){
    if(val=="null"){
        return "";
    }else{
        return val;
    }

}
  
    
/*
|| 基本設定テーブルを作成
*/
function createKihonSetteiTable_Main(){
    
    $('#tableKihonSettei').DataTable({
        bInfo: false,
        searching: false,
        bSort: true,
        destroy: true,
        "processing": true,
        ajax: {
            url: "/getMstSetting_Full",
            dataType: "json",
            dataSrc: function ( json ) {
                return JSON.parse(json.data);
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
            { data: 'param_nm'  ,width: '100%'}
        ],
        language: {
           url: "../static/main/js/japanese.json"
        },
        "scrollY":        $(window).height() * 35 / 100,
        "pageLength": 1000,
        paging:false,
        "order": [ 0, "asc" ],
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-5'i><'col-sm-7'p>>"
    });
}

    
$('#tableKatuyo tbody').on( 'click', 'tr', function () {
    var rowData =   $('#tableKatuyo').DataTable().row( this ).data();
    getCsvData(rowData.param_val2);
    //createKihonSetteiTable_Shosai(rowData.param_id);
});

function getCsvData(viewnm){

    var groupkb = $("#selCsvGroupKb").val();
    var nentuki = $('#selCsvNentuki').val();
    var tanto = $('#selCsvTanto').val();

    
    $.ajax({
        type: "GET",
        url: "/getCsvData/" + viewnm + "/"  + nentuki + "/" + groupkb + "/" + tanto + ""
    }).done(function(data) {
        let bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
        //let blob = new Blob([bom, data], {type: 'text/csv'});
        // encoding.js
        // var str_array = Encoding.stringToCode(data);
        // var sjis_array = Encoding.convert(str_array, "SJIS", "UTF8");
        // var uint8_array = new Uint8Array(sjis_array);
        //var blob = new Blob([uint8_array], { type: "text/csv;" });

        var blob=new Blob([bom, data], {type: "text/csv"});//
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "" + Math.random().toString(32).substring(2) + ".csv";
        link.click();
    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
    });
}

/*
|| データ抽出　ファイル種別名テーブルを作成
*/
function createKatuyoTable_Main(){
    
    $('#tableKatuyo').DataTable({
        bInfo: false,
        searching: false,
        bSort: true,
        destroy: true,
        "processing": true,
        ajax: {
            url: "/getMstSetting_Main/CSV_FILE_NAME",
            dataType: "json",
            dataSrc: function ( json ) {
                return JSON.parse(json.data);
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
            { data: 'param_val1'  ,width: '100%'}
        ],
        language: {
           url: "../static/main/js/japanese.json"
        },
        "scrollY":        $(window).height() * 35 / 100,
        "pageLength": 1000,
        paging:false,
        "order": [ 0, "asc" ],
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-5'i><'col-sm-7'p>>"
    });
}

$('#tableKihonSettei tbody').on( 'click', 'tr', function () {
    var rowData =   $('#tableKihonSettei').DataTable().row( this ).data();
    createKihonSetteiTable_Shosai(rowData.param_id);
});
  
/*
|| 基本設定テーブル２を作成
*/
function createKihonSetteiTable_Shosai(paramid){
    $('#tableKihonSetteiDetail').DataTable({
        bInfo: false,
        searching: false,
        bSort: true,
        destroy: true,
        "processing": true,
        ajax: {
            url: "/getMstSetting_Main/" + paramid + "",
            dataType: "json",
            dataSrc: function ( json ) {
                return JSON.parse(json.data);
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
            { data: 'param_no'    ,width: '5%'},
            { data: 'param_val1'  ,width: '70%'},
            { data: 'param_val2'  ,width: '25%'}
        ],
        aoColumnDefs: [
            { 'bSortable': false, 'aTargets': [ 1 ] },
            { 'bSortable': false, 'aTargets': [ 2 ] }
         ],
        language: {
           url: "../static/main/js/japanese.json"
        },
        "scrollY":        $(window).height() * 35 / 100,
        "pageLength": 1000,
        paging:false,
        "order": [ 0, "asc" ],
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-5'i><'col-sm-7'p>>"
    });
}


$("#tableCustomer tbody").on('click',function(event) {
    $("#tableCustomer").removeClass('row_selected customer');        
    $("#tableCustomer tbody tr").removeClass('row_selected customer');        
    $("#tableCustomer tbody td").removeClass('row_selected customer');        
    $(event.target.parentNode).addClass('row_selected customer');
    
});

$("#tableDaicho tbody").on('click',function(event) {
    $("#tableDaicho").removeClass('row_selected daicho');        
    $("#tableDaicho tbody tr").removeClass('row_selected daicho');        
    $("#tableDaicho tbody td").removeClass('row_selected daicho');        
    $(event.target.parentNode).addClass('row_selected daicho');
    
});


$("#tableAddDaicho tbody").on('click',function(event) {
    $("#tableAddDaicho").removeClass('row_selected addDaicho');        
    $("#tableAddDaicho tbody tr").removeClass('row_selected addDaicho');        
    $("#tableAddDaicho tbody td").removeClass('row_selected addDaicho');        
    $(event.target.parentNode).addClass('row_selected addDaicho');
    
});

$("#tableAddDaichoGroup tbody").on('click',function(event) {
    $("#tableAddDaichoGroup").removeClass('row_selected addDaichoGroup');        
    $("#tableAddDaichoGroup tbody tr").removeClass('row_selected addDaichoGroup');        
    $("#tableAddDaichoGroup tbody td").removeClass('row_selected addDaichoGroup');        
    $(event.target.parentNode).addClass('row_selected addDaichoGroup');
    
});

$("#tableAddSeikyu tbody").on('click',function(event) {
    $("#tableAddSeikyu").removeClass('row_selected addSeikyu');        
    $("#tableAddSeikyu tbody tr").removeClass('row_selected addSeikyu');        
    $("#tableAddSeikyu tbody td").removeClass('row_selected addSeikyu');        
    $(event.target.parentNode).addClass('row_selected addSeikyu');
    
});

$("#tableKihonSettei tbody").on('click',function(event) {
    $("#tableKihonSettei").removeClass('row_selected kihonSettei');        
    $("#tableKihonSettei tbody tr").removeClass('row_selected kihonSettei');        
    $("#tableKihonSettei tbody td").removeClass('row_selected kihonSettei');        
    $(event.target.parentNode).addClass('row_selected kihonSettei');
});


$("#tableKihonSetteiDetail tbody").on('click',function(event) {
    $("#tableKihonSetteiDetail").removeClass('row_selected kihonSetteiDetail');        
    $("#tableKihonSetteiDetail tbody tr").removeClass('row_selected kihonSetteiDetail');        
    $("#tableKihonSetteiDetail tbody td").removeClass('row_selected kihonSetteiDetail');        
    $(event.target.parentNode).addClass('row_selected kihonSetteiDetail');
});


$("#tableKatuyo tbody").on('click',function(event) {
    $("#tableKatuyo").removeClass('row_selected katuyo');        
    $("#tableKatuyo tbody tr").removeClass('row_selected katuyo');        
    $("#tableKatuyo tbody td").removeClass('row_selected katuyo');        
    $(event.target.parentNode).addClass('row_selected katuyo');
});




$("#tableCustomerListMuko tbody").on('click',function(event) {
    $("#tableCustomerListMuko").removeClass('row_selected listMuko');        
    $("#tableCustomerListMuko tbody tr").removeClass('row_selected listMuko');        
    $("#tableCustomerListMuko tbody td").removeClass('row_selected listMuko');        
    $(event.target.parentNode).addClass('row_selected listMuko');
    
});



$("#tableSeikyu tbody").on('click',function(event) {
    $("#tableSeikyu").removeClass('row_selected seikyu');        
    $("#tableSeikyu tbody tr").removeClass('row_selected seikyu');        
    $("#tableSeikyu tbody td").removeClass('row_selected seikyu');        
    $(event.target.parentNode).addClass('row_selected seikyu');
});



$("#tableSeikyuKanri tbody").on('click',function(event) {
    $("#tableSeikyuKanri").removeClass('row_selected seikyuKanri1');        
    $("#tableSeikyuKanri tbody tr").removeClass('row_selected seikyuKanri1');        
    $("#tableSeikyuKanri tbody td").removeClass('row_selected seikyuKanri1');        
    $(event.target.parentNode).addClass('row_selected seikyuKanri1');
});


$("#tableSeikyuKanriCustomer tbody").on('click',function(event) {
    $("#tableSeikyuKanriCustomer").removeClass('row_selected seikyuKanri2');        
    $("#tableSeikyuKanriCustomer tbody tr").removeClass('row_selected seikyuKanri2');        
    $("#tableSeikyuKanriCustomer tbody td").removeClass('row_selected seikyuKanri2');        
    $(event.target.parentNode).addClass('row_selected seikyuKanri2');
    
});














function IsNyuryokuOk(selectorkey){
    if($('#'+selectorkey).val().trim()==""){
        var placeholder =  $('#'+selectorkey).attr("placeholder");
        $('#'+selectorkey).focus()
        $('#'+selectorkey).css("background-color","#ffeff7");
        $('#'+selectorkey).attr("placeholder","入力してください");
        setTimeout('$("#'+selectorkey+'").attr("placeholder","' + placeholder + '"); $("#'+ selectorkey+'").css("background-color","");', 1500);
        return false;
    }
    return true;
}

/*
|| 
*/
$('#btnAnswer').on('click', function() {

    //alert($('#selJititaiKibo').val());
  
    if(IsNyuryokuOk("txtVendorNm")==false){
        return false;
    }
    
    if(IsNyuryokuOk("txtSystemNm")==false){
        return false;
    }
    
    var rdrank = $('input:radio[name="rdRank1"]:checked').val();
    if(rdrank==undefined){
        $('#rdRank1Area').css("background-color","#ffeff7");
        $("#rdRank1Area").append("<p id='tmpP' style='color:red; font-size:12px'>5～1のいずれかを選択してください。</p>");
        setTimeout('$("#tmpP").remove(); $("#rdRank1Area").css("background-color","white");', 1500);
        return false;
    }

    var comment = $('#txtareaComment1').val() == "" ? "　" : $('#txtareaComment1').val();

    $.ajax({
        type: "GET",
        url: "/insertToko/" + $('#txtVendorNm').val() + "/" + $('#txtSystemNm').val() + "/" + rdrank + "/" + comment + "/" + $('#selJititaiKibo').val() + "/" + $('#selTodohuken').val()     
    }).done(function(data) {
        alert("ご協力ありがとうございました。");
    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
        //alert(data);
        $('#modalQuestion').modal("hide");
        createTokoTables_Main();
        createKoeTables_Main();
  });
});



$('#modalQuestion').on("shown.bs.modal", function (e) {
    $('#txtVendorNm').val("");
    $('#txtSystemNm').val("");
    $('input:radio[name="rdRank1"]').each(function(){
        $(this).prop('checked', false);
    });
    $('#txtareaComment1').val("");

    var commentAreaWdith = toNumber($('#txtVendorNm')[0].clientWidth);
    if(commentAreaWdith!=0){
        $("#txtareaComment1").css("width",commentAreaWdith + "px");
        $("#txtareaComment1").css("height","70px");
    }
});

/*
|| 
*/
function createTokoTables_Main(){
    
    $('#tableToko').DataTable({
        bInfo: false,
        bSort: true,
        destroy: true,
        "processing": true,
        ajax: {
            url: "/getTokoList",
            dataType: "json",
            dataSrc: function ( json ) {
                return JSON.parse(json.data);
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
            { data: 'vendor_nm'     ,width: '45%' ,  className: 'dt-body-left'},
            { data: 'kensu'         ,width: '25%' ,  className: 'dt-body-center'},
            { data: 'rank1_avg'     ,width: '30%' ,  className: 'dt-body-center', render: 
            function (data, type, row) { 
                return data.toFixed(2);
            } }
        ],
        aoColumnDefs: [
            { 'bSortable': false, 'aTargets': [ 0 ] }
         ],
        language: {
           url: "../static/main/js/japanese.json"
        },
        searching: false,
        "pageLength": 1000,
        "scrollY":$(window).height() * 30 / 100,
        paging:false,
        "order": [ 1, "desc" ],
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      "preDrawCallback": function (settings) {
        return;
      },
      "drawCallback": function (settings) {
          //$('div.dataTables_scrollBody').scrollTop(pageScrollPos);
          //$('#tableToko')[0].parentElement.scrollTop = pageScrollPos;
          return;
      }
    });
  }

  
$('input[type="range"]').on('input', function() {
    //
    var txtid = this.id.replace("slider","txt");
    $("#" + txtid + "").val($(this).val());
});

function fncNumOnlyMax10(){
    var elem = event.srcElement;
    var inp = $(elem).val();
    inp = inp.replace("０","0");
    inp = inp.replace("１","1");
    inp = inp.replace("２","2");
    inp = inp.replace("３","3");
    inp = inp.replace("４","4");
    inp = inp.replace("５","5");
    inp = inp.replace("６","6");
    inp = inp.replace("７","7");
    inp = inp.replace("８","8");
    inp = inp.replace("９","9");
    var ret = inp.replace(/[‐－―ー]/g, '-').replace(/[^\-\d\.]/g, '').replace(/(?!^\-)[^\d\.]/g, '');
    if(ret<=0){
        ret = 1;
    }else if(ret >= 10){
        ret = 10;
    }
    $(elem).val(ret);
    var sliderid = elem.id.replace("txt","slider");
    $("#" + sliderid + "").val(ret);

    // $(event.srcElement).val(ret.toLocaleString());
}

/*
|| 
*/
$('#btnNanajikuAnswer').on('click', function() {

    var val = toNumber($('#txtChimeido').val());
    if(val < 1 || 10 < val){
        alert("質問 1 の評価を入力してください。");
        return;
    }
    val = toNumber($('#txtTukaiyasusa').val());
    if(val < 1 || 10 < val){
        alert("質問 2 の評価を入力してください。");
        return;
    }
    val = toNumber($('#txtKakakutekisei').val());
    if(val < 1 || 10 < val){
        alert("質問 3 の評価を入力してください。");
        return;
    }
    val = toNumber($('#txtSupportjubun').val());
    if(val < 1 || 10 < val){
        alert("質問 4 の評価を入力してください。");
        return;
    }
    val = toNumber($('#txtTeianmiryoku').val());
    if(val < 1 || 10 < val){
        alert("質問 5 の評価を入力してください。");
        return;
    }
    val = toNumber($('#txtSehenoSinrai').val());
    if(val < 1 || 10 < val){
        alert("質問 6 の評価を入力してください。");
        return;
    }
    val = toNumber($('#txtSubsystemhohu').val());
    if(val < 1 || 10 < val){
        alert("質問 7 の評価を入力してください。");
        return;
    }

    var vals = "";
    vals = vals + $('#txtChimeido').val() + ",";
    vals = vals + $('#txtTukaiyasusa').val() + "," ;
    vals = vals + $('#txtKakakutekisei').val() + "," ;
    vals = vals + $('#txtSupportjubun').val() + "," ;
    vals = vals + $('#txtTeianmiryoku').val() + "," ;
    vals = vals + $('#txtSehenoSinrai').val() + "," ;
    vals = vals + $('#txtSubsystemhohu').val();
    $.ajax({
        type: "GET",
        url: "/insertNanajikuHyoka/" + selectRowData.vendor_nm + "/" + vals
    }).done(function(data) {
        alert("ご協力ありがとうございました。");
    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
        //alert(data);
        $('#modalNanajikuHyoka').modal("hide");
        CreateRadarChart(); //レーダーチャートを再構築
    });
});






$('#modalNanajikuHyoka').on("shown.bs.modal", function (e) {
    $('#spanNanajikuHyokaTitle').text(selectRowData.vendor_nm + "について教えてください。");
    $('#txtChimeido').val("");
    $('#txtTukaiyasusa').val("");
    $('#txtKakakutekisei').val("");
    $('#txtSupportjubun').val("");
    $('#txtTeianmiryoku').val("");
    $('#txtSehenoSinrai').val("");
    $('#txtSubsystemhohu').val("");
    $('#sliderChimeido').val("");
    $('#sliderTukaiyasusa').val("");
    $('#sliderKakakutekisei').val("");
    $('#sliderSupportjubun').val("");
    $('#sliderTeianmiryoku').val("");
    $('#sliderSehenoSinrai').val("");
    $('#sliderSubsystemhohu').val("");
    return;
});


$('#modalTokuiBunya').on("shown.bs.modal", function (e) {
    $('#spanTokuiBunyaTitle').text(selectRowData.vendor_nm + "の製品で、使ったことのあるシステム種類にレ点を入れてください。");
    return;
});

var selectRowData;

$("#tableToko tbody").on('click','tr', function(event) {
    //選択した行を保持。selectRowDataはグローバルスコープ。
    selectRowData = $('#tableToko').DataTable().row(this).data();

    //選択した行を青くする。
    $("#tableToko").removeClass('row_selected tableToko');        
    $("#tableToko tbody tr").removeClass('row_selected tableToko');        
    $("#tableToko tbody td").removeClass('row_selected tableToko');        
    $(event.target.parentNode).addClass('row_selected tableToko');

    //レーダーチャート回答用のボタンからdisabledを削除して使えるようにする
    $('#btnNanajikuQuestion').removeAttr("disabled");
    $('#selVendorNmHikaku').removeAttr("disabled");
    $('#btnTokuiBunyaQuestion').removeAttr("disabled");

    CreateRadarChart();
    createBunyaMap();
    createBarChartKibo();
    createTodohuken();
    createKoeTables_Main();
    createJissekiTables_Main();
    
});
//
//ableToko tbody').on( 'click', 'tr', function () {
///顧客テーブルから指定したレコード
//ar rowData =   $('#tableSeikyuKanri').DataTable().row( this ).data();
//
//

$("#tableJisseki tbody").on('click','tr', function(event) {
    //選択した行を青くする。
    $("#tableJisseki").removeClass('row_selected tableJisseki');        
    $("#tableJisseki tbody tr").removeClass('row_selected tableJisseki');        
    $("#tableJisseki tbody td").removeClass('row_selected tableJisseki');        
    $(event.target.parentNode).addClass('row_selected tableJisseki');
    
});
//$("#tableKoe tbody").on('click','tr', function(event) {
//    //選択した行を青くする。
//    $("#tableKoe").removeClass('row_selected tableKoe');        
//    $("#tableKoe tbody tr").removeClass('row_selected tableKoe');        
//    $("#tableKoe tbody td").removeClass('row_selected tableKoe');        
//    $(event.target.parentNode).addClass('row_selected tableKoe');
//    
//});

Chart.defaults.global.defaultFontColor = '#4d4d4d';
Chart.defaults.global.defaultFontStyle = 'Bold';
Chart.defaults.global.defaultFontStyle = '600';
Chart.defaults.global.elements.rectangle.borderWidth = 2;
Chart.defaults.global.elements.point.radius=2;

function CreateRadarChart(){
    var dummy = "左の表から企業名を選択してください。"
    var selectVendor = (selectRowData == undefined ? dummy : selectRowData.vendor_nm);
    //var ctx = document.getElementById('myChart').getContext('2d');
    var chartData = {
        type: 'radar',
        data: {
            labels: ['1.知名度の高さ', '2.機能の使いやすさ', '3.価格は適正か', '4.サポートは十分か', '5.提案は魅力的か', '6.SEを信頼できるか', '7.サブシステムは豊富か'],
            datasets: []
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scale: {
                angleLines: {
                    display: true
                },
                ticks: {
                    min: 1,
                    max: 10
                }
            }
        }
    };

    getRadarChartData(chartData, selectVendor);
}

var nanajikuRadarChart=null;

function getRadarChartData(chartData, selectVendor){
    var idx = chartData.data.datasets.length;
    if(idx==0){
        //var ctx = $("#myChart").get(0).getContext("2d");
        if(nanajikuRadarChart!=null){
            nanajikuRadarChart.destroy();// = new Chart(ctx, null);
        }
    }
    $.ajax({
        type: "GET",
        url: "/getNanajikuAverage/" + selectVendor + ""
    }).done(function(json) {
        chartData.data.datasets.push({
            label: '',
            backgroundColor: BgColor_RadarChart[idx],
            borderColor: BdrColor_RadarChart[idx],
            data: [],
            borderWidth: 1
        });

        chartData.data.datasets[idx].label = selectVendor;//(idx == 0 ? selectVendor : selectVendor.substring(0,2));
        list = JSON.parse(json.data);
        if(list.length > 0){
            $.each(list, function(i, item) {
                chartData.data.datasets[idx].data.push(item.shubetu1_avg);
                chartData.data.datasets[idx].data.push(item.shubetu2_avg);
                chartData.data.datasets[idx].data.push(item.shubetu3_avg);
                chartData.data.datasets[idx].data.push(item.shubetu4_avg);
                chartData.data.datasets[idx].data.push(item.shubetu5_avg);
                chartData.data.datasets[idx].data.push(item.shubetu6_avg);
                chartData.data.datasets[idx].data.push(item.shubetu7_avg);
            });
        }
    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(json) {
        list = JSON.parse(json.data);
        if(idx==0){
            if(list.length>0){
                //比較選択に使うプルダウンを作る
                $.getJSON("/getVendorNmList", function(json) {
                    list = JSON.parse(json.data);
                    $('#selVendorNmHikaku .dropdown-menu').empty();
                    $.each(list, function(i, item) {
                        $('#selVendorNmHikaku .dropdown-menu').append('<li><a onclick=funcRadarHikaku("' + item.vendor_nm + '");>' + item.vendor_nm);
                    });
                    $('#selVendorNmHikaku .btn').removeAttr("disabled");
                });
            } else {
                $('#selVendorNmHikaku .btn').attr("disabled","disabled");
            }
        }
        var ctx = $("#myChart").get(0).getContext("2d");
        if(idx==0){
            nanajikuRadarChart = new Chart(ctx, chartData);
        }else{
            nanajikuRadarChart.update();
        }
    });
}


function funcRadarHikaku(vendornm){
    if(nanajikuRadarChart.data.datasets.length > 4){
        alert("これ以上比較対象を追加できません。");
        return false;
    }
    var add = true;
    $.each(nanajikuRadarChart.data.datasets, function(i, item) {
        if(item.label==vendornm){
            add = false;
        }
    });
    
    if(add){
        getRadarChartData(nanajikuRadarChart, vendornm);
    }
}

const BgColor_RadarChart =  ["rgba(2,35,199,.2)", "rgba(199,2,2,.2)", "rgba(42,199,2,.2)", "rgba(153,2,199,.2)", "rgba(199,120,2,.2)"];
const BdrColor_RadarChart = ["rgba(2,35,199,1)",  "rgba(199,2,2,1)",  "rgba(42,199,2,1)",  "rgba(153,2,199,1)",  "rgba(199,120,2,1)"];

$('#selVendorNmHikaku .btn').on('click', function() {
    if($(this).attr("disabled")=="disabled"){
        return false;
    }
});

$('#btnNanajikuQuestion').on('click', function() {
    if($(this).attr("disabled")=="disabled"){
        return false;
    }
});


$('#btnTokuiBunyaQuestion').on('click', function() {
    if($(this).attr("disabled")=="disabled"){
        return false;
    }
});


function createBarChartKibo(){
    var ctx = $("#barChartKibo").get(0).getContext("2d");
    //if(idx==0){
    //    nanajikuRadarChart = new Chart(ctx, chartData);
    //}else{
    //    nanajikuRadarChart.update();
    //}
    var myBar = new Chart(ctx, {
        type: 'bar',                           //◆棒グラフ
        data: {                                //◆データ
            labels: ['組合','村','町','市①','市②','中核','政令','県', '他'],     //ラベル名
            datasets: [{                       //データ設定
                data: [5,20,11,2,30,5,20,11,2,30,5,20,11,2,30],          //データ内容
                backgroundColor:[
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderWidth:[0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                borderColor: [
                    "rgb(75, 192, 192)",
                    "rgb(153, 102, 255)",
                    "rgb(75, 192, 192)",
                    "rgb(153, 102, 255)",
                    "rgb(75, 192, 192)",
                    "rgb(153, 102, 255)",
                    "rgb(75, 192, 192)",
                    "rgb(153, 102, 255)",
                    "rgb(75, 192, 192)",
                ]
            }]
        },
        options: {                             //◆オプション
            responsive: true,                  //グラフ自動設定
            legend: {                          //凡例設定
                display: false                 //表示設定
           },
            title: {                           //タイトル設定
                display: false,                 //表示設定
                fontSize: 12,                  //フォントサイズ
                text: 'タイトル'                //ラベル
            },
            scales: {                          //軸設定
                yAxes: [{                      //y軸設定
                    display: true,             //表示設定
                    scaleLabel: {              //軸ラベル設定
                       display: false,          //表示設定
                       labelString: '構築回数',  //ラベル
                       fontSize: 13               //フォントサイズ
                    },
                    ticks: {                      //最大値最小値設定
                        min: 0,                   //最小値
                        max: 20,                  //最大値
                        fontSize: 11,             //フォントサイズ
                        fontStyle: "bold",
                        stepSize: 5               //軸間隔
                    },
                }],
                xAxes: [{                         //x軸設定
                    display: true,                //表示設定
                    barPercentage: 0.8,           //棒グラフ幅
                    categoryPercentage: 0.5,      //棒グラフ幅
                    scaleLabel: {                 //軸ラベル設定
                       display: false,             //表示設定
                       labelString: '横軸ラベル',  //ラベル
                       fontSize: 18               //フォントサイズ
                    },
                    ticks: {
                        fontSize: 12,             //フォントサイズ
                        fontStyle: "bold"
                    },
                }],
            },
            layout: {                             //レイアウト
                padding: {                          //余白設定
                    left: 10,
                    right: 10,
                    top: 0,
                    bottom: 0
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        $.each($("#selJititaiKibo").find("option"), function(i, item){
                            if((tooltipItem.index+1) == item.value){
                                label = item.innerText;
                            }
                        });

                        if (label) {
                            label += ': ';
                        }
                        label += Math.round(tooltipItem.yLabel * 100) / 100;
                        return label;
                    }
                }
            }
        }
    });
}

function createBunyaMap(){
    //$.each(SystemBunya, function(i, bunya) {
    //    $("#tableBunyaMap").append("<tr><td>" + bunya);
    //});

    var dummy = "dummy"
    var selectVendor = (selectRowData == undefined ? dummy : selectRowData.vendor_nm);
    $.ajax({
        type: "GET",
        url: "/getBunyaMap/" + selectVendor + ""
    }).done(function(json) {
        list = JSON.parse(json.data);
        var trBunyaMapid;
        var trBunyaInputid;
        $('#tableBunyaMap').empty();
        $('#tableBunyaInput1').empty();
        $('#tableBunyaInput2').empty();
        $.each(list, function(i, item) {

            var customstyle="";
            var disprank = ""
            if(item.kensu == 0){
                customstyle = 'style= "background:linear-gradient(to right, #e6e6e6 0%, white 100%); color:#808080"';
                //background: linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%);
                disprank = "-";
            } else if(item.kensu <= 3){
                customstyle = 'style= "background:linear-gradient(to right, #ffec80 0%, white 30%)"';
                disprank = "D";
            } else if(item.kensu <= 7){
                customstyle = 'style= "background:linear-gradient(to right, #ffec80 0%, white 70%)"';
                disprank = "C";
            } else if(item.kensu <= 10){
                customstyle = 'style= "background:linear-gradient(to right, #ffec80 0%, #ffa280 70%, white 80%)"';
                disprank = "B";
            } else if(item.kensu <= 15){
                customstyle = 'style= "background:linear-gradient(to right, #ffec80 0%, #ff8f66 100%)"';
                disprank = "A";
            } else {
                customstyle = 'style= "background:linear-gradient(to right, #ffec80 0%, red 120%); font-weight:bold"';
                disprank = "S";
            }
            
            if((item.bunya_cd%9)==1){
                trBunyaMapid = "trBunyaMap_" + item.bunya_cd;
                $("#tableBunyaMap").append('<tr id="' + trBunyaMapid + '">');
            }
            $("#tableBunyaMap #" + trBunyaMapid).append('<td class="tdBunyaMapNm" ' + customstyle + ' aria-label="' + item.bunya_nm + "　構築実績：" + item.kensu + "件" + '" data-balloon-pos="left"  >' + item.ryaku_nm + "　" + disprank);

            if(item.bunya_cd<=15){
                trBunyaInputid = "trBunyaInput1_" + item.bunya_cd;
                $("#tableBunyaInput1").append('<tr id="' + trBunyaInputid + '">');
                $("#tableBunyaInput1 #" + trBunyaInputid).append('<td nowrap class="tdBunyaInputNm" ' + customstyle + ' aria-label="' + item.bunya_nm + "　構築実績：" + item.kensu + "件" + '" data-balloon-pos="left"  >' + paddingright(item.bunya_nm,'　',12)+ disprank);
                $("#tableBunyaInput1 #" + trBunyaInputid).append('<td nowrap class="tdBunyaInputNm"><input type="checkbox" id="chkBunyaInputCd_' + item.bunya_cd + '">');
            } else {
                trBunyaInputid = "trBunyaInput2_" + item.bunya_cd;
                $("#tableBunyaInput2").append('<tr id="' + trBunyaInputid + '">');
                $("#tableBunyaInput2 #" + trBunyaInputid).append('<td nowrap class="tdBunyaInputNm" ' + customstyle + ' aria-label="' + item.bunya_nm + "　構築実績：" + item.kensu + "件" + '" data-balloon-pos="left"  >' + paddingright(item.bunya_nm,'　',12)+ disprank);
                $("#tableBunyaInput2 #" + trBunyaInputid).append('<td nowrap class="tdBunyaInputNm"><input type="checkbox" id="chkBunyaInputCd_' + item.bunya_cd + '">');
            }

            
            
            //$('#selVendorNm .dropdown-menu').append('<li><a onclick=$("#txtVendorNm").val("' + item.vendor_nm + '");>'+item.vendor_nm);
        });
    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
        //何もしない
    });
    //$("#tableBunyaMap").append("<tr><td>b");
    //$("#tableBunyaMap").append("<tr><td>c");
    //$("#tableBunyaMap tr")[$("#tableBunyaMap tr").length-1]
    //var b = "aaa";
}


function createTodohuken(){
    createAreaMap();

    var dummy = "dummy"
    var selectVendor = (selectRowData == undefined ? dummy : selectRowData.vendor_nm);
    $.ajax({
        type: "GET",
        url: "/getTodohuken/" + selectVendor + ""
    }).done(function(json) {
        var list = JSON.parse(json.data);
        //var a;
        $.each(list, function(i, item) {
            //a = item;
            $('#tblAreaMap .' + item.hyoka_value + '').addClass("tdfk_flash");
            $('#tblAreaMap .' + item.hyoka_value + '').attr("aria-label",item.kensu + "件");
            $('#tblAreaMap .' + item.hyoka_value + '').attr("data-balloon-pos","left");

            if(i<=4){
                if(TODOHUKEN[item.hyoka_value] != undefined){
                    $('#tblAreaMap #tblAreaMapTd_' + (i+2) + '_1').text("　" + TODOHUKEN[item.hyoka_value] + "　" + item.kensu + "件");
                    $('#tblAreaMap #tblAreaMapTd_' + (i+2) + '_1').css("padding","1px");
                    $('#tblAreaMap #tblAreaMapTd_' + (i+2) + '_1').css("text-align","left");
                }
            }
        });
        //var b = a;
    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
        //何もしない
    });
}

function paddingright(val,char,n){
    for(; val.length < n; val+=char);
    return val;
}




/*
|| 
*/
$('#btnTokuiBunyaAnswer').on('click', function() {
    var vals = "";
    $.each($("#tableBunyaInput1").find("input"), function(i, chk){
        if(chk.type=="checkbox"){
            vals = vals + chk.id.split("_")[1] + "," + chk.checked + "|"
        }
    });
    $.each($("#tableBunyaInput2").find("input"), function(i, chk){
        if(chk.type=="checkbox"){
            vals = vals + chk.id.split("_")[1] + "," + chk.checked + "|"
        }
    });
    $.ajax({
        type: "GET",
        url: "/insertTokuiBunya/" + selectRowData.vendor_nm + "/" + vals
    }).done(function(data) {
        alert("ご協力ありがとうございました。");
    }).fail(function(data) {
        alert("エラー：" + data.statusText);
    }).always(function(data) {
        $('#modalTokuiBunya').modal("hide");
        createBunyaMap();
  });
});



function createKoeTables_Main(){
    
    var selectVendor = (selectRowData == undefined ? "dummy" : selectRowData.vendor_nm);
    $('#tableKoe').DataTable({
        bInfo: false,
        bSort: true,
        destroy: true,
        "processing": true,
        ajax: {
            url: "/getKoeList/" + selectVendor,
            dataType: "json",
            dataSrc: function ( json ) {
                return JSON.parse(json.data);
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
            { data: 'hyoka_comment',width: '85%' ,  className: 'dt-body-left koecell', render: 
                function (data, type, row) { 
                    return row.ymdt.substring(0,10) + "　　　" + createHoshiMoji(row.hyoka_value) + "<br>" + data;
                }
            }
        ],
        aoColumnDefs: [
            { 'bSortable': false, 'aTargets': [ 0 ] }
         ],
        language: {
           url: "../static/main/js/japanese.json"
        },
        searching: false,
        "pageLength": 1000,
        "scrollY":$(window).height() * 35 / 100,
        paging:false,
        "order": [ 0, "desc" ],
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      "preDrawCallback": function (settings) {
        return;
      },
      "drawCallback": function (settings) {
          //$('div.dataTables_scrollBody').scrollTop(pageScrollPos);
          //$('#tableKoe')[0].parentElement.scrollTop = pageScrollPos;
          $('#tableKoeHeader').css("display","none");// (style='display:none;')
          //$('#tableKoeHeader td').css("border","0px");// (style='display:none;')
          //$('#tableKoeHeader tr').css("border","0px");// (style='display:none;')
          //$("#tableKoeHeader tbody").css("border","0px");// (style='display:none;')
          //$("#tableKoeHeader tbody tr").css("border","0px");// (style='display:none;')
          //$("#tableKoeHeader tbody tr td").css("border","0px");// (style='display:none;')
          //$("#tableKoeHeader tbody tr td").addClass("koecell");
          //$("#tableKoeHeader tbody tr").addClass("koecell");
          //$("#tableKoeHeader tbody").addClass("koecell");
          //$("#tableKoeHeader").addClass("koecell");
          $("#tableKoe").css("border-collapse","separate");
          $("#tableKoe").css("border-spacing","5px");
          $("#tableKoe .even td").css("background-color","rgb(173 255 47 / 57%)");
          $("#tableKoe .odd td").css("background-color","rgb(52 222 255 / 27%)");
          
          $("#tableKoe td").css("border-radius","10px");
          
          $("#tableKoe_wrapper .dataTables_scrollHead").css("height","0px");
          //border-collapse:separate;
          //return;
      }
    });
  }


  function createHoshiMoji(val){
      var ret = "";
      if(val==1){
          ret = "★☆☆☆☆";
        } else if(val==2){
            ret = "★★☆☆☆";
        } else if(val==3){
            ret = "★★★☆☆";
        } else if(val==4){
            ret = "★★★★☆";
        } else if(val==5){
            ret = "★★★★★";
        }
        return ret;
    }

$('#btnRefleshJisseki').on('click', function() {
    createJissekiTables_Main();
    //var selectVendor = (selectRowData == undefined ? "dummy" : selectRowData.vendor_nm);
    //$.ajax({
    //    type: "GET",
    //    url: "/scrapeByVendorNm/" + selectVendor 
    //}).done(function(data) {
    //    createJissekiTables_Main(data);
    //    alert(data);
    //}).fail(function(data) {
    //    alert("エラー：" + data.statusText);
    //}).always(function(data) {
    //    //alert(data);
    //    //$('#modalNanajikuHyoka').modal("hide");
    //    //CreateRadarChart(); //レーダーチャートを再構築
    //});
});


function createJissekiTables_Main(binddata){
    var selectVendor = (selectRowData == undefined ? "dummy" : selectRowData.vendor_nm);
    $('#tableJisseki').DataTable({
        bInfo: false,
        bSort: true,
        destroy: true,
        "processing": true,
        /*data: JSON.parse(binddata).aaData,*/
        ajax: {
            url: "/scrapeByVendorNm/" + selectVendor ,
            dataType: "json",
            dataSrc: function ( json ) {
                return json.aaData;
            },
            contentType:"application/json; charset=utf-8",
            complete: function () {
                return; 
            }
        },
        columns: [
          { data: 'anken'      ,width: '60%',  className: 'dt-body-left'},
          { data: 'kikan'      ,width: '25%',  className: 'dt-body-left'},
          { data: 'rakusatubi' ,width: '15%' ,  className: 'dt-body-left', render: 
            function (data, type, row) { 
                return data;
            }
          }
        ],
        language: {
           url: "../static/main/js/japanese.json",
        },
        searching: false,
        "pageLength": 1000,
        "scrollY":$(window).height() * 30 / 100,
        paging:false,
        "order": [ 0, "desc" ],
        "lengthMenu": [100, 300, 500, 1000],
        dom:"<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'l><'col-sm-6'f>>"+
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      "preDrawCallback": function (settings) {
        return;
      },
      "drawCallback": function (settings) {
          //$('div.dataTables_scrollBody').scrollTop(pageScrollPos);
          //$('#tableJisseki')[0].parentElement.scrollTop = pageScrollPos;
          return;
      }
    });
  }
