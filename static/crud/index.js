var companies = [
    {
      id: 1,
      name: "Bob",
      address: "Manila",
      age: 27
    },
    {
      id: 2,
      name: "Harry",
      address: "Baguio",
      age: 32
    }
  ];
  
  $.each(companies, function(i, company) {
    appendToUsrTable(company);
  });
  
  $("form").submit(function(e) {
    e.preventDefault();
  });
  
  $("form#addCompany").submit(function() {
    var company = {};
    var nameInput = $('input[name="name"]').val().trim();
    var addressInput = $('input[name="address"]').val().trim();
    var ageInput = $('input[name="age"]').val().trim();
    if (nameInput && addressInput && ageInput) {
      $(this).serializeArray().map(function(data) {
        company[data.name] = data.value;
      });
      var lastCompany = companies[Object.keys(companies).sort().pop()];
      company.id = lastCompany.id + 1;
  
      addCompany(company);
    } else {
      alert("All fields must have a valid value.");
    }
  });
  
  function addCompany(company) {
    companies.push(company);
    appendToCompanyTable(company);
  }
  
  function editCompany(id) {
    companies.forEach(function(company, i) {
      if (company.id == id) {
        $(".modal-body").empty().append(`
                  <form id="updateCompany" action="">
                      <label for="name">Name</label>
                      <input class="form-control" type="text" name="name" value="${company.name}"/>
                      <label for="address">Address</label>
                      <input class="form-control" type="text" name="address" value="${company.address}"/>
                      <label for="age">Age</label>
                      <input class="form-control" type="number" name="age" value="${company.age}" min=10 max=100/>
              `);
        $(".modal-footer").empty().append(`
                      <button type="button" type="submit" class="btn btn-primary" onClick="updateCompany(${id})">Save changes</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </form>
              `);
      }
    });
  }
  
  function deleteCompany(id) {
    var action = confirm("Are you sure you want to delete this company?");
    var msg = "Company deleted successfully!";
    companies.forEach(function(company, i) {
      if (company.id == id && action != false) {
        companies.splice(i, 1);
        $("#companyTable #company-" + company.id).remove();
        flashMessage(msg);
      }
    });
  }
  
  function updateCompany(id) {
    var msg = "Company updated successfully!";
    var company = {};
    company.id = id;
    companies.forEach(function(company, i) {
      if (company.id == id) {
        $("#updateCompany").children("input").each(function() {
          var value = $(this).val();
          var attr = $(this).attr("name");
          if (attr == "name") {
            company.name = value;
          } else if (attr == "address") {
            company.address = value;
          } else if (attr == "age") {
            company.age = value;
          }
        });
        companies.splice(i, 1);
        companies.splice(company.id - 1, 0, company);
        $("#companyTable #company-" + company.id).children(".companyData").each(function() {
          var attr = $(this).attr("name");
          if (attr == "name") {
            $(this).text(company.name);
          } else if (attr == "address") {
            $(this).text(company.address);
          } else {
            $(this).text(company.age);
          }
        });
        $(".modal").modal("toggle");
        flashMessage(msg);
      }
    });
  }
  
  function flashMessage(msg) {
    $(".flashMsg").remove();
    $(".row").prepend(`
          <div class="col-sm-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
      `);
  }
  
  function appendToCompanyTable(company) {
    $("#companyTable > tbody:last-child").append(`
          <tr id="company-${company.id}">
              <td class="companyData" name="name">${company.name}</td>
              '<td class="companyData" name="address">${company.address}</td>
              '<td id="tdAge" class="companyData" name="age">${company.age}</td>
              '<td align="center">
                  <button class="btn btn-success form-control" onClick="editCompany(${company.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
              </td>
              <td align="center">
                  <button class="btn btn-danger form-control" onClick="deleteCompany(${company.id})">DELETE</button>
              </td>
          </tr>
      `);
  }