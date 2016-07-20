function zbLoadHosts(elementToUpdate) {
  $.ajax({
    url: "http://localhost:3000/zabbix/hosts"
  }).then(function(data) {
    // Now loop over the hosts and add them to the drop down.
    //var options = //$("select[name='cars']");
    data.forEach(function(x) {
      var option = document.createElement("option");
      option.text = x.name;
      option.value = x.hostid;
      $(elementToUpdate).append(option);
    });
  });
}

function zbLoadItems(elementToUpdate, hostID) {
  $.ajax({
    url: "http://localhost:3000/zabbix/items/" + hostID
  }).then(function(data) {
    data.forEach(function(x) {
      var option = document.createElement("option");
      option.text = x.name;
      option.value = x.itemid;
      $(elementToUpdate).append(option);
    });
  });
}

