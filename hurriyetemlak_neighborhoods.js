/* get neighborhoods from http://www.hurriyetemlak.com*/

var ww = $.map($("#ctl00_cphContent_ctlRealtySearchBox1_lstCities option").slice(1, $("#ctl00_cphContent_ctlRealtySearchBox1_lstCities option").length), function(item, i){
  return { name: $(item).text(), id: $(item).val() }
})


url = "http://www.hurriyetemlak.com/Json.aspx/GetNewCountyStaticMethod"
url2 = "http://www.hurriyetemlak.com/Json.aspx/GetAreaStaticMethod"
$.map(ww, function(item, i){
        $.ajax({
                 type: 'POST',
                 url: url,
                 data: "{nCityID:"+item["id"]+",nSelectCountyID:0}",
                 success: function(d){
                     var vv = $.map($(d["d"]), function(u, n){ return { name: $(u).text(), id: $(u).val() } });
                     item["tum"] = vv;
                     var vv_ids = $.map(vv, function(r, rn){ return r.id }).join(',');

                     $.ajax({
                         type: 'POST',
                         url: url2,
                         data: "{sCountyIDs:'"+vv_ids+"'}",
                         success: function(s){
                             var ss = $.map($(s["d"]), function(u, n){ return { name: $(u).text(), id: $(u).val() } });
                             item["semt"] = ss
                         },
                         dataType: "json",
                         contentType: "application/json; charset=UTF-8"
                     });

                 },
                 dataType: "json",
                contentType: "application/json; charset=UTF-8"
        });
})
