var serviceURL = "http://api.bluapps.in/services_v2/";
//var serviceURL = "http://api.bluapps.in/services_v2/";
var serviceURL = "http://localhost/h_app_api/services_v2/";

var version = "1.4.5";
var appname = "Blu Apps";
var ourclub_id = 1;
//var ourclub_id = localStorage.session_id_club_id;
//alert(ourclub_id);

$.mobile.popup.prototype.options.history = false;
localStorage.setItem("session_version", version);

function ShowHome()
{	
	
	//alert(localStorage.session_id_local);
	//if(localStorage.session_id_local != undefined)
	session_id_local= localStorage.getItem("session_id_local");
	if(session_id_local != undefined)	
	{
		//alert('11');
		//GetIDDetailsInfo();
		$.mobile.changePage( "#welcome",null, true, true);
		//$(':mobile-pagecontainer').pagecontainer('change', '#welcome', {
		//	transition: 'flip',
		//	changeHash: false,
		//	reverse: true,
		//	showLoadMsg: true
		//});	

		//alert('ok');
	}else
	{
		//alert('22');
		$.mobile.changePage( "#beforelogin",null, true, true);
		//$(':mobile-pagecontainer').pagecontainer('change', '#beforelogin', {
		//	transition: 'flip',
		//	changeHash: false,
		//	reverse: true,
		//	showLoadMsg: true
		//});		
	}
	//$.mobile.changePage( "#settings",null, true, true);	
}

function ShowHome2()
{	
	if(localStorage.session_id_local == undefined)
	{
		$.mobile.changePage( "#beforelogin",null, true, true);
	}else
	{
		//alert('test');
		name = localStorage.session_name;
		balance = localStorage.session_id_balance;
		mem_photo = localStorage.session_id_mem_photo;
		//alert(name);
		$.mobile.changePage( "#main",null, true, true);	
		$("#welcome_message").html('');
		$("#welcome_message").append("<li>Welcome " + name + "</li>").listview("refresh");
		$("#welcome_message").append("<li><center><img height=\"100\" src=\"" + mem_photo + "\"></center></li>").listview("refresh");
		$("#welcome_message").append("<li>Balance: Rs " + balance + "</li>").listview("refresh");
		
		$("#id_mem_photo").empty();
		$("#id_mem_photo").append("<img height=\"70\" src=\"" + localStorage.session_id_mem_photo + "\">").trigger('create');		
		$("#id_name").empty();
		$("#id_name").append(localStorage.session_name).trigger('create');
		$("#id_name2").empty();
		$("#id_name2").append(localStorage.session_owner_names).trigger('create');
		
		$("#id_add1").empty();
		$("#id_add1").append(localStorage.session_add1).trigger('create');
		$("#id_add2").empty();
		$("#id_add2").append(localStorage.session_add2).trigger('create');
		$("#id_city").empty();
		$("#id_city").append(localStorage.session_city + " " + localStorage.session_pin).trigger('create');
		$("#id_mobileno").empty();
		$("#id_mobileno").append(localStorage.session_mobileno).trigger('create');
		$("#id_emergency_contact_no").empty();
		$("#id_emergency_contact_no").append(localStorage.session_emergency_contact_no).trigger('create');
		$("#id_membership_id").empty();
		$("#id_membership_id").append(localStorage.session_membership_id).trigger('create');
		
		//$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
		//$("#welcome_message").append('').listview("refresh");
	}
}

function Login()
{
	if(localStorage.getItem("session_id_local") == undefined)
	{
		$.mobile.changePage( "#login",null, true, true);
	}else
	{
		$.mobile.changePage( "#welcome",null, true, true);
	}
}

function LogOut()
{
	localStorage.removeItem("session_id_local");
	localStorage.removeItem("session_name");
	localStorage.removeItem("session_org_name");
	localStorage.removeItem("session_validity");
	localStorage.removeItem("session_id_email_id");
	
	$.mobile.loading( 'show', {
		text: 'Logging Out ...',
		textVisible: true,
		theme: 'a',
		html: ""
	});	
	
	$("#username2").val('');
	$("#password").val('');
	
	$("#app-status-ul").html('');
	$("#app-status-ul2").html('');
	$.mobile.changePage( "#beforelogin",null, true, true);

	navigator.app.exitApp();
}

$(document).on('pageinit', '#beforeoldlogin', function()
{  
	$(document).on('click', '#submit_login', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			username = document.getElementById("mobile").value;
			//password = document.getElementById("password").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			alert(username);
			//alert(password);
			device_browser = '';
			//return false;
		  
			//if($('#username').val().length > 0 && $('#password').val().length > 0)
			if($('#mobile').val().length > 0)
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Checking Login ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//alert(serviceURL);
					url = serviceURL + 'pre_login/1';
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {membership_id: username, device_id: device_id, device_platform: device_platform, ver: session_version, device_browser: device_browser},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							

							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								$.mobile.changePage( "#login",null, true, true);
								//return false;
								//alert(username);
								$('#username2').val(username);
								showMessage(result.message,null,appname,'OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,appname,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function BldChange()
{
	property_id = $("#property_id").val();
	//alert(property_id);
	
	wings2 = $("#data_wings").val();
	$('#wing_name').empty();
	$('#wing_name').append( new Option('Select Wing *', '') );	
	
	$('#data_wings option').each(function(index,element)
	{
	 console.log(index);
	 console.log(element.value);
	 //console.log(element.text);
	
	 var divided2 = element.value.split(":");
	 var name2 = divided2[0];
	 var name3 = divided2[1];
	 
	 if(index >0)
	 {
		 if(property_id == name2) // same building wing
		 {
			//alert(name2);
			//alert('same bldg');
			
			var divided3 = name3.split("###");
			//alert(divided3.length);
			//alert(divided3[0]);
			for(jj=0; jj<divided3.length; jj++)
			{
				wing = divided3[jj];
				//alert(divided3[jj]);
				 $('#wing_name').append( new Option(wing,wing) );
			}
			
		 }
		 //alert(name3);
		 //alert(element.text);
		 
		
		 //return false;
	 }
			$('#wing_name option').each(function(){ 
			   if($(this).text() == 'Select Wing *') 
					this.disabled=true;
			});
			
			
	 });	
	$("#wing_name")[0].selectedIndex = 0;	 
}

function getAvailClub()
{
		//alert('a');
		var contact_details_id = '';
		
		url = serviceURL + 'getAvailClub';
					//alert(url);//return false;
					
		$.ajax({url: url,
			data: {},
			type: 'post',                   
			async: 'true',
			dataType: 'json',
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				$.mobile.loading( "show" );
			},
			complete: function() {
				//alert('d');
				// This callback function will trigger on data sent/received complete
			   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				$.mobile.loading( "hide" );
			},
			success: function (result) {
				//alert('e');
				if(result.status == 'success') 
				{
					$.mobile.loading( "hide" );
					//alert('ok');
					//alert(result.status);
			
					$('#club_select').empty();
					$('#club_select').append( new Option('Select Club *' ,'') );
					$('#club_select_f').empty();
					$('#club_select_f').append( new Option('Select Club *' ,'') );
					
					for(i2=0; i2<Object.keys(result.club).length; i2++)
					{
						//alert(result.services[i2].building_name);
						//alert(result.services[i2].wings);
						loc_id = result.club[i2].loc_id;
						club_name = result.club[i2].club_name;
						club_logo = result.club[i2].club_logo;
						city = result.club[i2].city;
						//alert(loc_id + " "  + club_name);
						
						
						$('#club_select').append( new Option(club_name + ', ' + city ,loc_id) );
						$('#club_select_f').append( new Option(club_name + ', ' + city ,loc_id) );
						//wings = result.club[i2].wings;
						//alert(main_serv);
						
						//$('#data_wings').append( new Option(result.club[i2].wings,wings) );
					
					}
				//alert('1');
				//alert(JSON.stringify(result.club));
				
				$('#club_select option').each(function(){ 
				   if($(this).text() == 'Select Club *') 
						this.disabled=true;
				});
				$("#club_select")[0].selectedIndex = 0;	 
				$('#club_select').change();				
				
				$('#club_select_f option').each(function(){ 
				   if($(this).text() == 'Select Club *') 
						this.disabled=true;
				});
				$("#club_select_f")[0].selectedIndex = 0;	 
				$('#club_select_f').change();

					//showMessage(result.message,null,'Welcome','OK');
					
				} else 
				{
					//alert(result.message);
					$.mobile.loading( "hide" );								
					//showMessage(result.message,null,result.message,'OK');
					//alert('Logon unsuccessful!');
				}
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				//alert('Please check your data connection!');
				//showMessage('Please check your data connection!',null,'Error','OK');
				$.mobile.loading( "hide" );	
			}
		});                   
}

function GetBuildingWingInfo()
{
		
		var contact_details_id = '';
		
		//url = serviceURL + 'getBasicInfo/' + ourclub_id;
		url = serviceURL + 'getBasicInfo/' + localStorage.session_id_club_id;
					//alert(url);//return false;
					
		$.ajax({url: url,
			data: {},
			type: 'post',                   
			async: 'true',
			dataType: 'json',
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				$.mobile.loading( "show" );
			},
			complete: function() {
				//alert('d');
				// This callback function will trigger on data sent/received complete
			   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				$.mobile.loading( "hide" );
			},
			success: function (result) {
				//alert('e');
				if(result.status == 'success') 
				{
					$.mobile.loading( "hide" );
					//alert('ok');
					//alert(result.status);
					//alert(result.timing);
					//alert(result.club_name);
					localStorage.setItem("session_club_name", result.club_name);
					localStorage.setItem("session_club_city", result.city);
					
					$("#club_name").val(result.club_name);
					$("#data_club_logo").val(result.club_logo);
					$("#data_add1").val(result.add1);
					$("#data_add2").val(result.add2);
					$("#data_city").val(result.city);
					$("#data_pincode").val(result.pincode);
					$("#data_tel").val(result.tel);
					$("#data_fax").val(result.fax);
					$("#data_email").val(result.email);
					$("#data_website").val(result.website);
					$("#data_weeklyoff").val(result.weeklyoff);
					$("#data_timing").val(result.timing);
					
					//alert(result.timing);
					//alert(Object.keys(result.data).length);
					$('#data_services').empty();
					$('#property_id').empty();
					$('#property_id').append( new Option('Select Building *', '') );
					$('#data_wings').empty();
					$('#data_wings').append( new Option('Select Wing *', '') );			

					contact_details_id = result.club_name + "<br>" + result.add1 + "<br>" + result.add2 + "<br>" + result.city + " - " + result.pincode + "<br>Tel: " + result.tel + "<br>Timing: " + result.timing + "<br>Weekly Off: " + result.weeklyoff + "<br><br>" + '<a href="tel:' + result.tel + '">Call Support Team</a>' + '<br>';
					//alert(contact_details_id);
					console.log(contact_details_id);
					$("#contact_details_id").html(contact_details_id);
					localStorage.setItem("session_contact_details_id", contact_details_id);
			
				
				for(i2=0; i2<Object.keys(result.data).length; i2++)
				{
					//alert(result.data[i2].building_name);
					//alert(result.data[i2].wings);
					property_id = result.data[i2].property_id;
					wings = result.data[i2].wings;
					//alert(result.data[i2].building_name);
					$('#property_id').append( new Option(result.data[i2].building_name,property_id) );
					$('#data_wings').append( new Option(result.data[i2].wings,wings) );					
				}

				for(i2=0; i2<Object.keys(result.services).length; i2++)
				{
					//alert(result.services[i2].building_name);
					//alert(result.services[i2].wings);
					service_id = result.services[i2].service_id;
					service_name = result.services[i2].service_name;
					service_logo = result.services[i2].service_logo;
					game_rule = result.services[i2].game_rule;
					comments = result.services[i2].comments;
					main_serv = service_id + "###" + service_name + "###" + service_logo + "###" + comments + "###" +game_rule; 
					//alert(service_id + " "  + main_serv);
					
					
					$('#data_services').append( new Option(main_serv,service_id) );
					//wings = result.services[i2].wings;
					//alert(main_serv);
					
					//$('#data_wings').append( new Option(result.services[i2].wings,wings) );
				
				}
				//alert('1');
				//alert(JSON.stringify(result.services));
				
				localStorage.setItem("sess_service_list", JSON.stringify(result.services));
				//localStorage.setItem("test", test);
				//alert('2');

				$('#property_id option').each(function(){ 
				   if($(this).text() == 'Select Building *') 
						this.disabled=true;
				});
				$("#property_id")[0].selectedIndex = 0;	 


					//showMessage(result.message,null,'Welcome','OK');
					
				} else 
				{
					alert(result.message);
					$.mobile.loading( "hide" );								
					//showMessage(result.message,null,result.message,'OK');
					//alert('Logon unsuccessful!');
				}
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				//alert('Please check your data connection!');
				//showMessage('Please check your data connection!',null,'Error','OK');
				$.mobile.loading( "hide" );	
			}
		});                   
}

function GetIDDetailsInfo()
{
	
		//alert('a');
		var contact_details_id = '';
		
		//url = serviceURL + 'getmeminfo/' + ourclub_id;
		url = serviceURL + 'getmeminfo/' + localStorage.session_id_club_id;
		//alert(url);//return false;
		
		//alert(localStorage.session_id_local);
		if(localStorage.session_id_local == undefined)
		{
			alert('session variable not found');
			//showMessage('session variable not found',null,appname,'Error');
			LogOut();
			//return false;
		}
		
		device_id= localStorage.device_uuid;
		device_platform= localStorage.device_platform;
		device_browser= localStorage.device_browser;
		session_version= localStorage.session_version;
		session = localStorage.session_id_local;
				
		//alert(session);
						
		$.ajax({url: url,
			data: {device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version, session: session},
			type: 'post',                   
			async: 'true',
			dataType: 'json',
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				$.mobile.loading( "show" );
			},
			complete: function() {
				//alert('d');
				// This callback function will trigger on data sent/received complete
			   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				$.mobile.loading( "hide" );
			},
			success: function (result) {
				//alert('e');
				if(result.status == 'success') 
				{
					$.mobile.loading( "hide" );
					//alert('ok');
					//alert(result.status);
					//alert(result.owner_names);
					//alert(result.club_name);
					//$("#club_name").val(result.club_name);
					$("#data_owner_names").val(result.owner_names);
					$("#data_co_owner_names").val(result.co_owner_names);
					
					contact_details_id = result.club_name + "<br>" + result.add1 + "<br>" + result.add2 + "<br>" + result.city + " - " + result.pincode + "<br>Tel: " + result.tel + "<br>Timing: " + result.timing + "<br>Weekly Off: " + result.weeklyoff + "<br><br>" + '<a href="tel:' + result.tel + '">Call Support Team</a>' + '<br>';
					//alert(contact_details_id);
					//console.log(contact_details_id);
					localStorage.setItem("session_contact_details_id", contact_details_id);
					$("#contact_details_id").html(contact_details_id);
					
					localStorage.setItem("sess_data_owner_names", result.owner_names);
					localStorage.setItem("sess_data_co_owner_names", result.co_owner_names);
					
					
					for(i2=0; i2<Object.keys(result.services).length; i2++)
					{
						//alert(result.services[i2].building_name);
						//alert(result.services[i2].wings);
						service_id = result.services[i2].service_id;
						service_name = urldecode(result.services[i2].service_name);
						service_logo = urldecode(result.services[i2].service_logo);
						//game_rule = urldecode(result.services[i2].game_rule);
						//comments = urldecode(result.services[i2].comments);
						//main_serv = service_id + "###" + service_name + "###" + service_logo + "###" + comments + "###" +game_rule; 
						//alert(service_id + " "  + main_serv);
						
						//$('#data_services').append( new Option(main_serv,service_id) );
						//wings = result.services[i2].wings;
						//alert(main_serv);
						
						//$('#data_wings').append( new Option(result.services[i2].wings,wings) );
					
					}
					//alert('1');
					//alert(JSON.stringify(result.services));
					localStorage.setItem("sess_features_list", JSON.stringify(result.features));
					localStorage.setItem("sess_service_list", JSON.stringify(result.services));
				
					//alert(result.timing);
					//alert(Object.keys(result.data).length);

					$('#data_idcard').empty();
					//$('#data_idcard').append( new Option('Select Wing *', '') );			
					$('#cash_cardno').empty();
					$('#cash_cardno').append( new Option('Select Card *', '') );					
					
					//$('#cash_cardno2').empty();
					//$('#cash_cardno2').append( new Option('Select Card *', '') );
					
					first = 1;
																
					for(i2=0; i2<Object.keys(result.members).length; i2++)
					{
						//alert(result.services[i2].building_name);
						//alert(result.services[i2].wings);
						member_id = result.members[i2].member_id;						
						name = result.members[i2].name;
						m_type = result.members[i2].m_type;
						address = result.members[i2].address;
						mobile_member = result.members[i2].mobile_member;
						emergency_no = result.members[i2].emergency_no;
						membership_id = result.members[i2].membership_id;
						balance = result.members[i2].balance;
						validity = result.members[i2].validity;
						mem_photo = result.members[i2].mem_photo;
						v_status = result.members[i2].v_status;
						recharg_amt = result.members[i2].recharg_amt;
						dateofrecharge = result.members[i2].dateofrecharge;
						trans_amt = result.members[i2].trans_amt;
						trans_date = result.members[i2].trans_date;
						service_name = result.members[i2].service_name;
						
						var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity + "###" +mem_photo + "###" +v_status + "###" +recharg_amt + "###" +dateofrecharge + "###" +trans_amt + "###" +trans_date + "###" +service_name; 
						//alert(member_id + " * "  + main_serv2);
						
						$('#cash_cardno').append( new Option(urldecode(name) + ' (' + urldecode(membership_id) + ')', member_id + '###'+ urldecode(membership_id)) );
						//$('#cash_cardno2').append( new Option(urldecode(name) + ' (' + urldecode(membership_id) + ')', member_id + '###'+ urldecode(membership_id)) );
						
						//alert(urldecode(membership_id));

						$('#data_idcard').append( new Option(main_serv2,member_id) );
						//wings = result.services[i2].wings;
						//alert(result.services[i2].building_name);

						if(first == 1)
						{
							//alert(urldecode(name));
							localStorage.setItem("session_n_memphoto", mem_photo);
							localStorage.setItem("session_n_name", urldecode(name));
							localStorage.setItem("session_n_validity", validity);
							localStorage.setItem("session_n_balance", balance);	
							
							photo1 = '';
							validity1 = '';
							if(mem_photo.length>0)
							{
								photo1 = '<img width="70" height="70" src="' + mem_photo + '" align="left">	';
							}
							if(validity.length>0)
							{
								validity1 = '<p>Valid upto : ' + validity +'</p>';
							}							
							$("#session_n_name2").html(urldecode(name));
							$("#session_n_name2_1").html(urldecode(name));
							$("#session_n_name2_2").html(urldecode(name));
							$("#session_n_name2_3").html(urldecode(name));
							$("#session_n_name2_4").html(urldecode(name));
							$("#session_n_name2_5").html(urldecode(name));
							$("#session_n_name2_6").html(urldecode(name));
							$("#session_n_name2_7").html(urldecode(name));
							$("#session_n_name2_8").html(urldecode(name));
							
							//$("#name_contact").html(urldecode(name));
							//alert($("#name_contact").text);
							
							$("#session_n_validity2").html(validity1);
							$("#session_n_memphoto2").html(photo1);
							$("#contact_photo").html(photo1);
							$("#contact_name").html(urldecode(name));
							$("#contact_validity").html(validity1);
							$("#photo_contact").html(photo1);
							
							//$("#session_n_name1").html(localStorage.session_n_name);
						}
						first = first +1;
					}
					
					localStorage.setItem("sess_member_list", JSON.stringify(result.members));
					
					//$('#cash_cardno option').each(function(){ 
					//if($(this).text() == 'Select Card *') 
						//this.disabled=true;
					//});
					//$("#cash_cardno")[0].selectedIndex = 0;					
					//$('#cash_cardno2 option').each(function(){ 
					//if($(this).text() == 'Select Card *') 
					//	this.disabled=false;
					//});					
					//$("#cash_cardno2")[0].selectedIndex = 0;	
					//alert('aa');
					//document.getElementById("cash_cardno2").selectedIndex = "1";					
					//alert(name);
					//$("#cash_cardno").change();
					//$("#cash_cardno2").val("").change();
					//$("#cash_cardno2").change();
					//showMessage(result.message,null,'Welcome','OK');
				} else 
				{

					alert(result.message);
					LogOut();
					//navigator.app.exitApp();
												
					//showMessage(result.message,null,result.message,'OK');
					//alert('Logon unsuccessful!');
				}
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				//alert('Please check your data connection!');
				//showMessage('Please check your data connection!',null,'Error','OK');
				$.mobile.loading( "hide" );	
			}
		});     		
}

function GetIDDetailsInfo2()
{
	
		//alert('a');
		var contact_details_id = '';
		
		//url = serviceURL + 'getmeminfo/' + ourclub_id;
		url = serviceURL + 'getmeminfo2/' + localStorage.session_id_club_id;
		//alert(url);//return false;
		
		//alert(localStorage.session_id_local);
		if(localStorage.session_id_local == undefined)
		{
			alert('session variable not found');
			//showMessage('session variable not found',null,appname,'Error');
			LogOut();
			//return false;
		}
		
		device_id= localStorage.device_uuid;
		device_platform= localStorage.device_platform;
		device_browser= localStorage.device_browser;
		session_version= localStorage.session_version;
		session = localStorage.session_id_local;
				
		//alert(session);
						
		$.ajax({url: url,
			data: {device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version, session: session},
			type: 'post',                   
			async: 'true',
			dataType: 'json',
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				$.mobile.loading( "show" );
			},
			complete: function() {
				//alert('d');
				// This callback function will trigger on data sent/received complete
			   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				$.mobile.loading( "hide" );
			},
			success: function (result) {
				//alert('e');
				if(result.status == 'success') 
				{
					$.mobile.loading( "hide" );
					//alert('ok');
					//alert(result.status);
					//alert(result.owner_names);
					//alert(result.club_name);
					//$("#club_name").val(result.club_name);
					$("#data_owner_names").val(result.owner_names);
					$("#data_co_owner_names").val(result.co_owner_names);
					
					//contact_details_id = result.club_name + "<br>" + result.add1 + "<br>" + result.add2 + "<br>" + result.city + " - " + result.pincode + "<br>Tel: " + result.tel + "<br>Timing: " + result.timing + "<br>Weekly Off: " + result.weeklyoff + "<br><br>" + '<a href="tel:' + result.tel + '">Call Support Team</a>' + '<br>';
					//alert(contact_details_id);
					//console.log(contact_details_id);
					//localStorage.setItem("session_contact_details_id", contact_details_id);
					//$("#contact_details_id").html(contact_details_id);
					
					localStorage.setItem("sess_data_owner_names", result.owner_names);
					localStorage.setItem("sess_data_co_owner_names", result.co_owner_names);
					
					
					//alert(result.timing);
					//alert(Object.keys(result.data).length);

					$('#data_idcard').empty();
					//$('#data_idcard').append( new Option('Select Wing *', '') );			
					$('#cash_cardno').empty();
					$('#cash_cardno').append( new Option('Select Card *', '') );					
					
					//$('#cash_cardno2').empty();
					//$('#cash_cardno2').append( new Option('Select Card *', '') );
					
					first = 1;
																
					for(i2=0; i2<Object.keys(result.members).length; i2++)
					{
						//alert(result.services[i2].building_name);
						//alert(result.services[i2].wings);
						member_id = result.members[i2].member_id;						
						name = result.members[i2].name;
						m_type = result.members[i2].m_type;
						address = result.members[i2].address;
						mobile_member = result.members[i2].mobile_member;
						emergency_no = result.members[i2].emergency_no;
						membership_id = result.members[i2].membership_id;
						balance = result.members[i2].balance;
						validity = result.members[i2].validity;
						mem_photo = result.members[i2].mem_photo;
						v_status = result.members[i2].v_status;
						recharg_amt = result.members[i2].recharg_amt;
						dateofrecharge = result.members[i2].dateofrecharge;
						trans_amt = result.members[i2].trans_amt;
						trans_date = result.members[i2].trans_date;
						service_name = result.members[i2].service_name;
						
						var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity + "###" +mem_photo + "###" +v_status + "###" +recharg_amt + "###" +dateofrecharge + "###" +trans_amt + "###" +trans_date + "###" +service_name; 
						//alert(member_id + " * "  + main_serv2);
						
						$('#cash_cardno').append( new Option(urldecode(name) + ' (' + urldecode(membership_id) + ')', member_id + '###'+ urldecode(membership_id)) );
						//$('#cash_cardno2').append( new Option(urldecode(name) + ' (' + urldecode(membership_id) + ')', member_id + '###'+ urldecode(membership_id)) );
						
						//alert(urldecode(membership_id));

						$('#data_idcard').append( new Option(main_serv2,member_id) );
						//wings = result.services[i2].wings;
						//alert(result.services[i2].building_name);

						if(first == 1)
						{
							//alert(urldecode(name));
							localStorage.setItem("session_n_memphoto", mem_photo);
							localStorage.setItem("session_n_name", urldecode(name));
							localStorage.setItem("session_n_validity", validity);
							localStorage.setItem("session_n_balance", balance);	
							
							photo1 = '';
							validity1 = '';
							if(mem_photo.length>0)
							{
								photo1 = '<img width="70" height="70" src="' + mem_photo + '" align="left">	';
							}
							if(validity.length>0)
							{
								validity1 = '<p>Valid upto : ' + validity +'</p>';
							}							
							$("#session_n_name2").html(urldecode(name));
							$("#session_n_name2_1").html(urldecode(name));
							$("#session_n_name2_2").html(urldecode(name));
							$("#session_n_name2_3").html(urldecode(name));
							$("#session_n_name2_4").html(urldecode(name));
							$("#session_n_name2_5").html(urldecode(name));
							$("#session_n_name2_6").html(urldecode(name));
							$("#session_n_name2_7").html(urldecode(name));
							$("#session_n_name2_8").html(urldecode(name));
							
							//$("#name_contact").html(urldecode(name));
							//alert($("#name_contact").text);
							
							$("#session_n_validity2").html(validity1);
							$("#session_n_memphoto2").html(photo1);
							$("#contact_photo").html(photo1);
							$("#contact_name").html(urldecode(name));
							$("#contact_validity").html(validity1);
							$("#photo_contact").html(photo1);
							
							//$("#session_n_name1").html(localStorage.session_n_name);
						}
						first = first +1;
					}
					
					localStorage.setItem("sess_member_list", JSON.stringify(result.members));
					
				} else 
				{
					//alert(result.message);
					$.mobile.loading( "hide" );								
					//showMessage(result.message,null,result.message,'OK');
					//alert('Logon unsuccessful!');
				}
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				//alert('Please check your data connection!');
				//showMessage('Please check your data connection!',null,'Error','OK');
				$.mobile.loading( "hide" );	
			}
		});     		
}

$(document).on('pageinit', '#11beforelogin', function()
{  
	$(document).on('click', '#11submit_login2', function(e) 
	{
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			localStorage.setItem("session_id_local", "aaa");
			$(':mobile-pagecontainer').pagecontainer('change', '#welcome', {
				transition: 'flip',
				changeHash: false,
				reverse: true,
				showLoadMsg: true
			});	
		e.handled = true;
		}
		
		return false;
	});    
});

$(document).on('pageinit', '#beforelogin', function()
{  
	$(document).on('click', '#submit_login2', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			username = document.getElementById("username2").value;
			password = document.getElementById("password").value;
			selected_club = $('#club_select').val();
			
			//alert(username);
			//alert(selected_club);
			
			if(selected_club == null || selected_club.length == 0)
			{
				//alert('Please select Club'); 
				showMessage('Please select Club',null,'Error','OK');
				return false;
			}
			if(username.length == 0)
			{
				//alert('Enter Mobile No'); 
				showMessage('Enter Mobile No',null,'Error','OK');
				return false;
			}
			if(username.length != 10)
			{
				//alert('Mobile No should be 10 character'); 
				showMessage('Mobile No should be 10 character',null,'Error','OK');
				return false;
			}			
			if(password.length ==0)
			{
				//alert('Please Enter Password'); 
				showMessage('Please Enter Password',null,'Error','OK');
				return false;
			}			
			//return false;
			//alert(username);
			//alert(password);
			
			club_info = $("#club_select :selected").text();
			//alert(club_info); return false;
			
			//$("#club_name_1").html(club_info);
			
			$("#title_contact").html('');
			$("#session_n_validity2").html('');
			//$("#contact_details_id").html('');
			$("#session_n_memphoto2").html('');
			$("#session_n_name2").html('');
			$("#session_n_validity2").html('');
					  
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			
			if($('#username2').val().length > 0 && $('#password').val().length > 0 && selected_club != null)
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Checking Login ...',
						textVisible: true,
						theme: 'e',
						html: ""
					});	
					
					//alert(serviceURL);
					//url = serviceURL + 'login_v2/' + ourclub_id;
					url = serviceURL + 'login_v2/' + selected_club;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {mobile: username, otp: password, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status == 'success') 
							{
								//navigator.notification.beep(1);
								$.mobile.loading( "hide" );
								$("#username2").val('');
								$("#password").val('');
								
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								localStorage.removeItem("session_n_memphoto");
								localStorage.removeItem("session_n_name");
								localStorage.removeItem("session_n_validity");
								//localStorage.removeItem("session_contact_details_id");
			
								//localStorage.removeItem("session_n_memphoto");
								//localStorage.removeItem("session_n_name");
								//localStorage.removeItem("session_n_validity");
								
								session_id = result.session_id;
								mu_id = result.mu_id;
								$("#mu_id").val(mu_id);
								
								contact_details_id = result.club_name + "<br>" + result.add1 + "<br>" + result.add2 + "<br>" + result.city + " - " + result.pincode + "<br>Tel: " + result.tel + "<br>Timing: " + result.timing + "<br>Weekly Off: " + result.weeklyoff + "<br><br>" + '<a href="tel:' + result.tel + '">Call Support Team</a>' + '<br>';
								//alert(contact_details_id);
								//console.log(contact_details_id);
								$("#contact_details_id").html(contact_details_id);
					
								//localStorage.setItem("session_id_local", "aaa");
								//$.mobile.changePage( "#beforelogin",null, true, true);
								//return false;
								//localStorage.setItem("session_id_username", username);
								localStorage.setItem("session_id_local", session_id);
								localStorage.setItem("session_name", urldecode(result.data.name));
								localStorage.setItem("session_id_mu_id", mu_id);
								//localStorage.setItem("session_id_club_id", "1");
								localStorage.setItem("session_id_club_id", selected_club);
								localStorage.setItem("session_contact_details_id", contact_details_id);
								localStorage.setItem("session_club_info", club_info);

								/*
								localStorage.setItem("sess_features_list", JSON.stringify(result.features));
								//alert('ddd' + JSON.stringify(result.features));

						        var test3 = localStorage.getItem("sess_features_list");
								//alert(test3);
								test = JSON.parse(test3); //var test is now re-loaded!

								//alert(test.length);
								var features = [];
								for(j = 0; j<test.length; j++)
								{
									features.push(test[j].feature_code);
									//alert('adding');
								}
								//alert(jQuery.inArray("COMMUNITY", features) );
								//|| features.length ==0
								
								if(jQuery.inArray("COMMUNITY", features) != -1 )
								{
									//alert('aa');
									$("#a_community").hide();
								}else
								{
									$("#a_community").show();
								}

								if(jQuery.inArray("BOOK", features) != -1)
								{
									//alert('bb');
									$("#a_book").hide();
									$("#a_listticket").hide();
									$("#a_transticket").hide();
									$("#a_transhistory").hide();
								}
								else
								{
									$("#a_book").show();
									$("#a_listticket").show();
									$("#a_transticket").show();
									$("#a_transhistory").show();

								}										
								*/

								GetIDDetailsInfo();
								//GetBuildingWingInfo();
																
								//alert(result.message);
								
								//ShowHome();
								//$.mobile.changePage( "#welcome",null, true, true);	
								$(':mobile-pagecontainer').pagecontainer('change', '#welcome', {
									transition: 'flip',
									changeHash: false,
									reverse: true,
									showLoadMsg: true
								});	
								
								////$.mobile.changePage( "#welcome",null, true, true);
								//$("#welcome_message").html('');
								
								//showMessage(result.message,null,'Welcome','OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,result.message,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					//alert('Please fill all necessary fields');
					return false;
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

$(document).on('pageinit', '#rechargecash', function()
{  
	$(document).on('click', '#submitcash', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			 
			cash_amt = document.getElementById("cash_amt").value;
			//mu_id = document.getElementById("mu_id").value;
			cash_cardno = document.getElementById("cash_cardno").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			session = localStorage.session_id_local;
			mu_id = localStorage.session_id_mu_id;
			//alert(username);
			//alert(password);

			if(cash_cardno.length <= 0 )
			{
				//alert('select card to recharge');
				showMessage('Select card to recharge',null,appname,'OK');
				return false;
			}
			if(cash_amt.length <= 0 )
			{
				//alert('select amount for recharge');
				showMessage('Select amount for recharge',null,appname,'OK');
				return false;
			}
		  
			if(cash_amt.length > 0 )
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Adding Cash ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//alert(serviceURL);
					//url = serviceURL + 'addcash/' + ourclub_id;
					url = serviceURL + 'addcash/' + localStorage.session_id_club_id;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {mu_id: mu_id, cash_amt: cash_amt, cash_cardno: cash_cardno, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version, session: session},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status == 'success') 
							{
								cash_ref_id = result.transaction_no;
								$.mobile.loading( "hide" );
								//alert('Please pay cash at the counter, ref no: ' + cash_ref_id);
								showMessage('Please pay cash at the counter, ref no: ' + cash_ref_id,null,appname,'OK');
								//return false;
								//alert(result.status);
								//alert(result.message);
								//alert(result.data.name);
								//alert(result.data.email);
								//alert(result.data.mobileno);
								//alert(result.data.mem_validity);
								//alert(result.data.balance);
								//session_id = result.data.session_id;

								


								//alert(result.email_id);
								//$.mobile.changePage("#second");                         
								
								//alert(result.message);

								$.mobile.changePage( "#welcome",null, true, true);
								
								
							
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,result.message,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					//return false;
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

$(document).on('pageinit', '#newcomplain', function()
{  
	$(document).on('click', '#newcompbtn', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			//type_of_record = document.getElementById("type_of_record2").value;
			iagrree = $('input[name=society_formed]:checked').val();
			alert(iagrree);
			if(iagrree != 'on')
			{
				showMessage('Agree to Terms & Conditions',null,appname,'Error');
				return false;
			}
			//alert(iagrree);
			//return false;
			
			//password = document.getElementById("password").value;
			property_id = document.getElementById("property_id").value;
			wing_name = document.getElementById("wing_name").value;
			flat_no = document.getElementById("flat_no").value;
			flat_type = document.getElementById("flat_type").value;		
			owner_names = document.getElementById("owner_names").value;
			co_owner_names = document.getElementById("co_owner_names").value;
			tel = document.getElementById("tel").value;
			mobile = document.getElementById("mobile").value;
			purchase_source = document.getElementById("purchase_source").value;
			communication_address = document.getElementById("communication_address").value;			
			licensee_name = document.getElementById("licensee_name").value;
			lease_from = document.getElementById("lease_from").value;
			lease_to = document.getElementById("lease_to").value;
			//salutation = document.getElementById("salutation").value;
			f_name = document.getElementById("f_name").value;
			//l_name = document.getElementById("l_name").value;
			//mem_photo = document.getElementById("mem_photo").value;
			relation_with_owner = document.getElementById("relation_with_owner").value;
			gender = document.getElementById("gender").value;
			marital_status = document.getElementById("marital_status").value;
			date_of_birth = document.getElementById("date_of_birth").value;
			wedding_anniversary = document.getElementById("wedding_anniversary").value;
			tel_member = document.getElementById("tel_member").value;
			mobile_member = document.getElementById("mobile_member").value;
			emergency_contact_person = document.getElementById("emergency_contact_person").value;
			emergency_contact_no = document.getElementById("emergency_contact_no").value;
			blood_group = document.getElementById("blood_group").value;
			alergic_to = document.getElementById("alergic_to").value;
			profession = document.getElementById("profession").value;
			organisation_name = document.getElementById("organisation_name").value;
			add1 = document.getElementById("add1").value;
			
			if(property_id.length ==0)
			{
				showMessage('Select Building',null,appname,'Error');
				return false;
			}
			if(wing_name.length ==0)
			{
				showMessage('Select Wing',null,appname,'Error');
				return false;
			}
			if(flat_no.length ==0)
			{
				showMessage('Enter Flat No',null,appname,'Error');
				return false;
			}
			if(flat_type.length ==0)
			{
				showMessage('Select Flat Type',null,appname,'Error');
				return false;
			}
			if(owner_names.length ==0)
			{
				showMessage('Enter Owner Name',null,appname,'Error');
				return false;
			}				
			if(mobile_member.length !=10)
			{
				showMessage('Enter Mobile no of Member (of 10 char)',null,appname,'Error');
				return false;
			}	
			if(f_name.length ==0)
			{
				showMessage('Enter Member Name',null,appname,'Error');
				return false;
			}	
			if(gender.length ==0)
			{
				showMessage('Select Gender',null,appname,'Error');
				return false;
			}	
			if(marital_status.length ==0)
			{
				showMessage('Select Marital Status',null,appname,'Error');
				return false;
			}	
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(type_of_record);
			//alert(password);
			device_browser = '';
			//return false;
		  
			//if($('#username').val().length > 0 && $('#password').val().length > 0)
			if(type_of_record.length > 0 )
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Submiting Complain ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//return false;
					//alert(serviceURL);
					url = serviceURL + 'newcomplain/' + ourclub_id;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {type_of_record: type_of_record, property_id: property_id, wing_name: wing_name, flat_no: flat_no, flat_type: flat_type, owner_names: owner_names, co_owner_names: co_owner_names, tel: tel, mobile: mobile, purchase_source: purchase_source, communication_address: communication_address,licensee_name: licensee_name, lease_from: lease_from, lease_to: lease_to, f_name: f_name, relation_with_owner: relation_with_owner, gender: gender, marital_status: marital_status, date_of_birth: date_of_birth, wedding_anniversary: wedding_anniversary,tel_member: tel_member, mobile_member: mobile_member, emergency_contact_person: emergency_contact_person, emergency_contact_no: emergency_contact_no, blood_group: blood_group, alergic_to: alergic_to, profession: profession, organisation_name: organisation_name, add1: add1, email: email, tel_office: tel_office, c_company_name: c_company_name, c_address: c_address, c_tel: c_tel, c_fax: c_fax, c_contact_person: c_contact_person, c_contact_tel: c_contact_tel, c_contact_mobile: c_contact_mobile, c_email_id: c_email_id, device_id: device_id, device_platform: device_platform, ver: session_version, device_browser: device_browser},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert('kk' + result.status);
							if(result.status == 'success') 
							{
								flat_id = result.flat_id;
								$.mobile.loading( "hide" );
								//alert(flat_id);
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								//return false;
								//alert(username);
								//$('#username2').val(username);
								
								$("#member_flat_id1").val(flat_id);
								$("#member_flat_id").val(flat_id);
								$("#type_of_record1").val(type_of_record);
								$("#type_of_record2").val(type_of_record);
								//$.mobile.changePage( "#signup2",null, true, true);
								showMessage(result.message,null,appname,'OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,appname,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					//$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});


$(document).on('pageinit', '#signup', function()
{  
	$(document).on('click', '#signup_submit', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			//type_of_record = document.getElementById("type_of_record2").value;
			type_of_record = $('input[name=type_of_record]:checked').val();
			iagrree = $('input[name=iagrree]:checked').val();
			if(iagrree != 'on')
			{
				showMessage('Agree to Terms & Conditions',null,appname,'Error');
				return false;
			}
			//alert(iagrree);
			//return false;
			
			//password = document.getElementById("password").value;
			property_id = document.getElementById("property_id").value;
			wing_name = document.getElementById("wing_name").value;
			flat_no = document.getElementById("flat_no").value;
			flat_type = document.getElementById("flat_type").value;		
			owner_names = document.getElementById("owner_names").value;
			co_owner_names = document.getElementById("co_owner_names").value;
			tel = document.getElementById("tel").value;
			mobile = document.getElementById("mobile").value;
			purchase_source = document.getElementById("purchase_source").value;
			communication_address = document.getElementById("communication_address").value;			
			licensee_name = document.getElementById("licensee_name").value;
			lease_from = document.getElementById("lease_from").value;
			lease_to = document.getElementById("lease_to").value;
			//salutation = document.getElementById("salutation").value;
			f_name = document.getElementById("f_name").value;
			//l_name = document.getElementById("l_name").value;
			//mem_photo = document.getElementById("mem_photo").value;
			relation_with_owner = document.getElementById("relation_with_owner").value;
			gender = document.getElementById("gender").value;
			marital_status = document.getElementById("marital_status").value;
			date_of_birth = document.getElementById("date_of_birth").value;
			wedding_anniversary = document.getElementById("wedding_anniversary").value;
			tel_member = document.getElementById("tel_member").value;
			mobile_member = document.getElementById("mobile_member").value;
			emergency_contact_person = document.getElementById("emergency_contact_person").value;
			emergency_contact_no = document.getElementById("emergency_contact_no").value;
			blood_group = document.getElementById("blood_group").value;
			alergic_to = document.getElementById("alergic_to").value;
			profession = document.getElementById("profession").value;
			organisation_name = document.getElementById("organisation_name").value;
			add1 = document.getElementById("add1").value;
			//add2 = document.getElementById("add2").value;
			//city = document.getElementById("city").value;
			//pin = document.getElementById("pin").value;
			email = document.getElementById("email").value;
			tel_office = document.getElementById("tel_office").value;
			c_company_name = document.getElementById("c_company_name").value;
			c_address = document.getElementById("c_address").value;
			c_tel = document.getElementById("c_tel").value;
			c_fax = document.getElementById("c_fax").value;
			c_contact_person = document.getElementById("c_contact_person").value;
			c_contact_tel = document.getElementById("c_contact_tel").value;
			c_contact_mobile = document.getElementById("c_contact_mobile").value;
			c_email_id = document.getElementById("c_email_id").value;
			
			if(property_id.length ==0)
			{
				showMessage('Select Building',null,appname,'Error');
				return false;
			}
			if(wing_name.length ==0)
			{
				showMessage('Select Wing',null,appname,'Error');
				return false;
			}
			if(flat_no.length ==0)
			{
				showMessage('Enter Flat No',null,appname,'Error');
				return false;
			}
			if(flat_type.length ==0)
			{
				showMessage('Select Flat Type',null,appname,'Error');
				return false;
			}
			if(owner_names.length ==0)
			{
				showMessage('Enter Owner Name',null,appname,'Error');
				return false;
			}				
			if(mobile_member.length !=10)
			{
				showMessage('Enter Mobile no of Member (of 10 char)',null,appname,'Error');
				return false;
			}	
			if(f_name.length ==0)
			{
				showMessage('Enter Member Name',null,appname,'Error');
				return false;
			}	
			if(gender.length ==0)
			{
				showMessage('Select Gender',null,appname,'Error');
				return false;
			}	
			if(marital_status.length ==0)
			{
				showMessage('Select Marital Status',null,appname,'Error');
				return false;
			}	
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(type_of_record);
			//alert(password);
			device_browser = '';
			//return false;
		  
			//if($('#username').val().length > 0 && $('#password').val().length > 0)
			if(type_of_record.length > 0 )
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Submiting Signup ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//return false;
					//alert(serviceURL);
					url = serviceURL + 'signup/' + ourclub_id;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {type_of_record: type_of_record, property_id: property_id, wing_name: wing_name, flat_no: flat_no, flat_type: flat_type, owner_names: owner_names, co_owner_names: co_owner_names, tel: tel, mobile: mobile, purchase_source: purchase_source, communication_address: communication_address,licensee_name: licensee_name, lease_from: lease_from, lease_to: lease_to, f_name: f_name, relation_with_owner: relation_with_owner, gender: gender, marital_status: marital_status, date_of_birth: date_of_birth, wedding_anniversary: wedding_anniversary,tel_member: tel_member, mobile_member: mobile_member, emergency_contact_person: emergency_contact_person, emergency_contact_no: emergency_contact_no, blood_group: blood_group, alergic_to: alergic_to, profession: profession, organisation_name: organisation_name, add1: add1, email: email, tel_office: tel_office, c_company_name: c_company_name, c_address: c_address, c_tel: c_tel, c_fax: c_fax, c_contact_person: c_contact_person, c_contact_tel: c_contact_tel, c_contact_mobile: c_contact_mobile, c_email_id: c_email_id, device_id: device_id, device_platform: device_platform, ver: session_version, device_browser: device_browser},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert('kk' + result.status);
							if(result.status == 'success') 
							{
								flat_id = result.flat_id;
								$.mobile.loading( "hide" );
								//alert(flat_id);
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								//return false;
								//alert(username);
								//$('#username2').val(username);
								
								$("#member_flat_id1").val(flat_id);
								$("#member_flat_id").val(flat_id);
								$("#type_of_record1").val(type_of_record);
								$("#type_of_record2").val(type_of_record);
								//$.mobile.changePage( "#signup2",null, true, true);
								callsignup2();
								showMessage(result.message,null,appname,'OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,appname,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function callsignup2()
{
	member_flat_id = document.getElementById("member_flat_id").value;

	if(member_flat_id.length > 0 )
	{
		$.mobile.changePage("#signup2",null, true, true);
		$("#f_name2").val('');
		$("#mem_photo2").val('');
		$("#relation_with_owner2").val('');
		$("#gender2").val('');
		$("#marital_status2").val('');
		$("#date_of_birth2").val('');
		$("#wedding_anniversary2").val('');
		$("#tel_member2").val('');
		$("#mobile_member2").val('');
		$("#emergency_contact_person2").val('');
		$("#emergency_contact_no2").val('');
		$("#alergic_to2").val('');
		$("#profession2").val('');
		$("#organisation_name2").val('');
		$("#add12").val('');
		$("#email2").val('');
		$("#tel_office2").val('');
	}else
	{
		showMessage('Error in form',null,appname,'Error');
		return false;		
	}
}

$(document).on('pageinit', '#signup_member', function()
{  
	$(document).on('click', '#signup_submit2', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			//type_of_record = document.getElementById("type_of_record2").value;
			type_of_record = $('input[name=type_of_record2]:checked').val();
			member_flat_id = document.getElementById("member_flat_id").value;
			if(member_flat_id.length <= 0)
			{
				showMessage('Error in form',null,appname,'Error');
				return false;
			}
			//alert(iagrree);
			//return false;
			
			//salutation = document.getElementById("salutation").value;
			f_name = document.getElementById("f_name2").value;
			//l_name = document.getElementById("l_name").value;
			//mem_photo = document.getElementById("mem_photo").value;
			
			type_of_record2 = document.getElementById("type_of_record2").value;
			relation_with_owner = document.getElementById("relation_with_owner2").value;
			gender = document.getElementById("gender2").value;
			marital_status = document.getElementById("marital_status2").value;
			date_of_birth = document.getElementById("date_of_birth2").value;
			wedding_anniversary = document.getElementById("wedding_anniversary2").value;
			tel_member = document.getElementById("tel_member2").value;
			mobile_member = document.getElementById("mobile_member2").value;
			emergency_contact_person = document.getElementById("emergency_contact_person2").value;
			emergency_contact_no = document.getElementById("emergency_contact_no2").value;
			blood_group = document.getElementById("blood_group2").value;
			alergic_to = document.getElementById("alergic_to2").value;
			profession = document.getElementById("profession2").value;
			organisation_name = document.getElementById("organisation_name2").value;
			add1 = document.getElementById("add1").value;
			//add2 = document.getElementById("add22").value;
			//city = document.getElementById("city2").value;
			//pin = document.getElementById("pin2").value;
			email = document.getElementById("email2").value;
			tel_office = document.getElementById("tel_office2").value;
			
			if(mobile_member.length !=10)
			{
				showMessage('Enter Mobile no of Member (of 10 char)',null,appname,'Error');
				return false;
			}	
			if(f_name.length ==0)
			{
				showMessage('Enter Member Name',null,appname,'Error');
				return false;
			}	
			if(gender.length ==0)
			{
				showMessage('Select Gender',null,appname,'Error');
				return false;
			}	
			if(marital_status.length ==0)
			{
				showMessage('Select Marital Status',null,appname,'Error');
				return false;
			}	
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(type_of_record);
			//alert(password);
			device_browser = '';
			//return false;
		  
			//if($('#username').val().length > 0 && $('#password').val().length > 0)
			if(type_of_record.length > 0 )
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Submiting Signup ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//return false;
					//alert(serviceURL);
					url = serviceURL + 'signup_member/' + ourclub_id;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {type_of_record2: type_of_record2, type_of_record: type_of_record, member_flat_id: member_flat_id, f_name: f_name, relation_with_owner: relation_with_owner, gender: gender, marital_status: marital_status, date_of_birth: date_of_birth, wedding_anniversary: wedding_anniversary,tel_member: tel_member, mobile_member: mobile_member, emergency_contact_person: emergency_contact_person, emergency_contact_no: emergency_contact_no, blood_group: blood_group, alergic_to: alergic_to, profession: profession, organisation_name: organisation_name, add1: add1, email: email, tel_office: tel_office, device_id: device_id, device_platform: device_platform, ver: session_version, device_browser: device_browser},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert('kk' + result.status);
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								//return false;
								//alert(username);
								//$('#username2').val(username);
								//$.mobile.changePage( "#beforelogin",null, true, true);
								//$.mobile.changePage("#signup2",null, true, true);
								callsignup2();
								showMessage(result.message,null,appname,'OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,appname,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function ListServices()
{	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	//return false;
	//http://localhost/h_app/services/list_services/1?session=HA90d272cbeaeb394e04d14b73045bb7eec92145c8
	//url = serviceURL + 'list_services/' + ourclub_id;
	url = serviceURL + 'list_services/' + localStorage.session_id_club_id;
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Getting Services ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		//alert(result.status);
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#search_result_afterlogin_prebook",null, true, true);
			$("#sum_list_afterlogin_book").html('');
			$("#card1").html('');
			
				for(i=0; i<Object.keys(result.data.service).length; i++)
				{
					service_id = result.data.service[i].service_id;
					scc_id = result.data.service[i].scc_id;
					service_name = result.data.service[i].service_name;
					service_logo = result.data.service[i].service_logo;
					s_validity = result.data.service[i].s_validity;
					//chargeable = result.data.service[i].chargeable;
					charges = result.data.service[i].charges;
					guest_charges = result.data.service[i].guest_charges;
					
					comments = result.data.service[i].comments;
					chargeable = '';
					
					img = '<img src="' + service_logo + '" height="50">';
					plus = '<img src="images/' + 'plus-outline.png' + '" height="24">';
					minus = '<img src="images/' + 'minus-outline.png' + '" height="24">';
					
					select = '<select name="dropdown"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option></select>';
					
					console.log(service_name);
					console.log(img);
					console.log(charges);
					
					console.log("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>");
					
					//$("#sum_list_afterlogin_book").append("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>").listview("refresh");
					
					//alert();
					
					$("#sum_list_afterlogin_prebook").append("<li><a href=\"#\" onclick=\"SetBookOption(" + service_id + ",'" + service_name + "','" + chargeable + "','" + charges + "','" + guest_charges + "','" + service_logo + "'"+ ");return false;\">" + img + " " + service_name + "<br>Member: Rs " + charges + "<br>Guest: Rs " + guest_charges + "</a></li>").listview("refresh");
					
					//alert('<div class="card"><div class="card-image"><img alt="home" src="' + service_logo + '" /><h2>' + service_name + '</h2></div><h3>Member: Rs ' + charges + '<br>Guest: Rs ' + guest_charges + '</h3><p>' + urldecode(comments) + "<button onclick=\"SetBookOption(" + service_id + "," + scc_id + ",'" + service_name + "','" + chargeable + "','" + charges + "','" + guest_charges + "','" + service_logo + "'"+ ");return false;\">Book</button>" + '</p>' + '</div>');
					//return false;
					
					$("#card1").append('<div class="card"><div class="card-image"><img alt="home" src="' + service_logo + '" /><h2>' + service_name + '</h2></div><h3>Member: Rs ' + charges + '<br>Guest: Rs ' + guest_charges + '</h3><p>' + urldecode(comments) + "<button onclick=\"SetBookOption(" + service_id + "," + scc_id + ",'" + service_name + "','" + chargeable + "','" + charges + "','" + guest_charges + "','" + service_logo + "'"+ ");return false;\">Book</button>" + '</p>' + '</div>');
					
					//'<p><button onclick="alert(' +   "'anil'" +    ');">Book</button></p>'
					//$("#sum_list_afterlogin_book").append("<li>Guest: " + plus + " 0 " + minus + " </li>").listview("refresh");		
					//$("#sum_list_afterlogin_book").append("<li>Guest: " + select + "</li>").listview("refresh");						
					//$("#sum_list_afterlogin_book").append("<li>" +  img + " " + service_name + "<br> Rs " + charges + "</li>").listview("refresh");
										
					//console.log(result[0][i].Location);
					
					//$("#sum_list_afterlogin_book").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
				}

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		//alert(result.status);
		alert(error);
		alert(request[0]);
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function SetBookID(service_id,service_name,chargeable,charges)
{
	//alert(service_id);
	//alert(service_name);
	//alert(chargeable);
	//alert(charges );
	$("#priceid").html('Rs ' + charges);
	$("#service_id").val(service_id);
	$("#service_name").val(service_name);
	$("#chargeable").val(chargeable);
	$("#charges").val(charges);
}

function ChangeMG()
{
	//alert('hi');
	mcount = $("#mgcount1").val();
	gcount = $("#mgcount2").val();
	//alert(mcount);
	//alert(gcount);
	
	$("#member").val(mcount);
	$("#guest").val(gcount);
	
	total = ($("#charges").val() * mcount) + ($("#guest_charges").val() * gcount);
	//alert(total);
	$("#priceid").html('Rs ' + total);
	
	$("#total_charge").val(total);
}

function ChangeCourt()
{
	cdown = $("#cdown").val();
	//gcount = $("#mgcount2").val();
	//alert(cdown);
	
	tsdown = $("#tsdown").val();
	//alert(tsdown);
	var divided = cdown.split(":");
	var name=divided[0];
	//var street = divided[1];
	//alert("court no " + name);
	
	$('#court_id').val(name);
		 $('#tsdown_1').empty();
		 $('#tsdown_1').append( new Option('Select Timing','0') );
			
	$('#tsdown option').each(function(index,element)
	{
	 console.log(index);
	 console.log(element.value);
	 console.log(element.text);
	
	 var divided2 = element.value.split(":");
	 var name2 = divided2[0];
	 var name3 = divided2[1];
	 
		//alert(element.text);
	    //alert(element.value + " : " + element.text);
		//alert(name2 + " * " + name3 + " * " + element.text);
		if(name == name2)
		{
		 $('#tsdown_1').append( new Option(element.text,name3) );
		}
	 });	
}

function ChangeTiming()
{
	tsdown_1 = $("#tsdown_1").val();
	//gcount = $("#mgcount2").val();
	//alert(tsdown_1);
	$('#slot_id').val(tsdown_1);
}

function SetBookOption(service_id,scc_id, service_name,chargeable,charges, guest_charges, service_logo)
{
	//alert(service_id);
	//alert(service_name);
	//alert(chargeable);
	//alert(charges );
	var selectcourt1 = '<select name="cdown" id="cdown" onchange="ChangeCourt();" data-native-menu="true"><option value="0" selected>Select Court</option>';
	var selectcourt2 = '';
	var selectcourt = '';

	var selectts1 = '<select name="tsdown" id="tsdown"><option value="0" selected>Select Timing</option>';
	var selectts2 = '';
	var selectts = '';
	
	var selectts1_1 = '<select name="tsdown_1" id="tsdown_1" onchange="ChangeTiming();"><option value="0" selected>Select Timing</option>';
	var selectts2_1 = '';
	var selectts_1 = '';

	var selectts1_2 = '<select name="tsdown_2" id="tsdown_2"><option value="0" selected>Select Timing</option>';
	var selectts2_2 = '';
	var selectts_2 = '';	
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&service_id="+ service_id + "&scc_id="+ scc_id;
	
	url = serviceURL + 'service_prop/1';
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Booking Service ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//alert('ok');
			//showMessage(result.message,null,appname,'OK');
			//alert(result.data.balance);
			console.log(result.message);
			//localStorage.setItem("session_id_balance", result.data.balance);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert('ok');
			//	selectcourt = '<select name="dropdown"><option value="0" selected>Court 1</option><option value="2">Court 2</option></select>';
			
			message = result.message;

			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				service_id = result.data.service[i].service_id;
				booking_allowed = result.data.service[i].booking_allowed;
				//alert(booking_allowed);
			}
			if(booking_allowed == 0)
			{
				//alert(message);
				showMessage(result.message,null,'Error','OK');
				return false;
			}
			//alert(selectcourt1);
			for(i2=0; i2<Object.keys(result.data.court).length; i2++)
			{
				court_id = result.data.court[i2].court_id;
				court_name = result.data.court[i2].court_name;
				court_capacity = result.data.court[i2].court_capacity;
				//alert(court_id);
				//alert(court_name);
				//alert(court_capacity);
				selectcourt2 = selectcourt2 + '<option value="' + court_id + ':' + court_capacity + '">' + court_name + '</option>';
				//'<option value="' + '" selected>' + court_name + '</option>'
				//alert(selectcourt2);
				
			}
			if(i2>0)
			{
				$("#court_id").val(1);
			}
			selectcourt = selectcourt1 + selectcourt2 + '</select>';
			//alert(selectcourt2);
			//alert(selectcourt);
			
			for(i3=0; i3<Object.keys(result.data.slots).length; i3++)
			{
				court_id3 = result.data.slots[i3].court_id;
				timesl_id = result.data.slots[i3].timesl_id;
				timing = result.data.slots[i3].timing;
				//alert(court_id);
				//alert(court_name);
				//alert(court_capacity);
				//selectts2 = selectts2 + '<option value="' + court_id3 + '">' + timing + '</option>';
				selectts2 = selectts2 + '<option value="' + court_id3 + ':' + timesl_id + '">' + timing + '</option>';
				
				//alert('<option value="' + court_id3 + ':' + timesl_id + '">');
				//'<option value="' + '" selected>' + court_name + '</option>'
				//alert(selectcourt2);
				
			}
			if(i3>0)
			{
				$("#slot_id").val(1);
			}
			selectts = selectts1 + selectts2 + '</select>';
			selectts1_1 = selectts1_1 + '</select>';
			selectts1_2 = selectts1_2 + '</select>';
			//alert(selectts);
			//alert(selectts1_1);
			
			//alert('ok2');
			var courtpar = '';
			var timing_par = '';
			if(i2>0) // court
			{
				var courtpar = "Court: " + selectcourt + "<br>";
			}
			if(i3>0) // slot
			{
				var timing_par = "Timing: " + selectts1_1 + "<br>";
				if(i2 == 0)
				{
					var timing_par = "Timing: " + selectts + "<br>";
				}
			}
			para = selectts + courtpar + timing_par + "Member: " + select + "<br>Guest: " + select2;
				//$("#cdown").selectmenu('refresh', true);

			$("#sum_list_afterlogin_book").append("<li><p>" + para + "</p>").listview("refresh");
			
			//$("#cdown").selectmenu('refresh');
			//$("#cdown").selectmenu('refresh', true);
			
			$("#tsdown").hide();
			//alert(selectcourt);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
				
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});       
	
	$.mobile.changePage( "#search_result_afterlogin_book",null, true, true);
	$("#sum_list_afterlogin_book").html('');
						
	img = '<img src="' + service_logo + '" height="50">';
	plus = '<img src="images/' + 'plus-outline.png' + '" height="24">';
	minus = '<img src="images/' + 'minus-outline.png' + '" height="24">';
	
	select = '<select name="mgcount1" id="mgcount1" onchange="ChangeMG();"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>';
	
	select2 = '<select name="mgcount2" id="mgcount2" onchange="ChangeMG();"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>';

	selectdate = '<select name="dropdown"><option value="0" selected>Today</option><option value="2">07-Mar-2016</option><option value="8">08-Mar-2016</option></select>';
	
	//selectcourt = '<select name="dropdown"><option value="0" selected>Court 1</option><option value="2">Court 2</option></select>';

	selecttiming = '<select name="dropdown"><option value="0" selected>10:30 to 11:10 AM</option><option value="2">11:10 to 11:50 AM</option><option value="3">11:50 to 12:30 AM</option></select>';
	
	
	console.log(service_name);
	console.log(img);
	console.log(charges);
	
	console.log("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " <h2>" + service_name + "</h2><br> Rs " + charges  + "</a></li>");
	
	//$("#sum_list_afterlogin_book").append("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>").listview("refresh");
	
	//$("#sum_list_afterlogin_book").append("<li><a href=\"#\" onclick=\"SetBookOption(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>").listview("refresh");
	
	//$("#sum_list_afterlogin_book").append("<li>Guest: " + plus + " 0 " + minus + " </li>").listview("refresh");		
	
	aa = '<div class="ui-grid-b">    <div class="ui-block-a"><div class="ui-bar ui-bar-a" >Block A</div></div>    <div class="ui-block-b"><div class="ui-bar ui-bar-a" >Block B</div></div>    <div class="ui-block-c"><div class="ui-bar ui-bar-a">Block C</div></div></div>';

	//$("#sum_list_afterlogin_book").append(aa).listview("refresh");

	$("#sum_list_afterlogin_book").append("<li>" +  img + " " + service_name + "<br><p >Member: Rs " + charges + "<p >Guest: Rs " + guest_charges + "</p></li>").listview("refresh");
	
	//$("#cdown").trigger("change");
	//$("#sum_list_afterlogin_book").append("<form><div class=\"ui-field-contain\"><label for=\"select-native-1\">Basic:</label><select name=\"select-native-1\" id=\"select-native-1\"> <option value=\"4\">The 4th Option</option></select></div></form>");

	//if(service_name == 'Swimming')
	//{
	//	para = "Member: " + select + "<br>Guest: " + select2;
	//}else if(service_name == 'Steam')
	//{
	//	para = "Date: " + selectdate + "<br>Member: " + select + "<br>Guest: " + select;
	//}else
	//{
	//	para = "Date: " + selectdate + "<br>Court: " + selectcourt + "<br>Timing: " + selecttiming + "<br>Member: " + select + "<br>Guest: " + select2;
	//}
	
	//para =  "Member: " + select + "<br>Guest: " + select2;
	//$("#sum_list_afterlogin_book").append("<li><p>" + para + "</p>").listview("refresh");
	
	//$("#sum_list_afterlogin_book").append("<li><p>Date: " + selectdate + "</p>").listview("refresh");						
	//$("#sum_list_afterlogin_book").append("<p>Court: " + selectcourt + "</p>").listview("refresh");						
	//$("#sum_list_afterlogin_book").append("<p>Timing: " + selecttiming + "</p>").listview("refresh");						
	//$("#sum_list_afterlogin_book").append("<p>Guest: " + select + "</p></li>").listview("refresh");						
	
	//console.log(result[0][i].Location);
	
	//$("#sum_list_afterlogin_book").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
					
	//$("#priceid").html('Rs ' + charges);
	$("#service_id").val(service_id);
	$("#service_name").val(service_name);
	$("#chargeable").val(chargeable);
	$("#charges").val(charges);
	$("#guest_charges").val(guest_charges);
	$("#member").val(0);
	$("#guest").val(0);
	$("#total_charge").val(0);
	$("#priceid").html('');
}

function mypopup(id, service_name , ticket_no ,ticket_type, datec, service_date, timing, court_name, member_id2)
{
		//alert(id);
		//alert(ticket_no);
		//alert(member_id2);
		
		ticket_url = serviceURL + 'genqr?ticket_no=' + id;
		//alert(ticket_url);
		
		var ticket1 = '';
		ticket1 += '<img src="' + ticket_url + '" align="center"><br>';
		console.log(ticket1);
		
		ticket1 += service_name + '<br>';
		ticket1 += 'Booking Date: ' + datec + '<br>';
		ticket1 += 'Ticket Type: ' + ticket_type + '<br>';
		ticket1 += 'Service Date: ' + service_date  + ' (' + timing +  ')<br>';
		//ticket1 += 'Booking Date: ' + datec + '<br>';
		if(court_name.length>0)
		{
				ticket1 += 'Court: ' + court_name + '<br>';
		}
		
		var test2 = localStorage.getItem("sess_member_list");
		//alert(test2);
		test = JSON.parse(test2); //var test is now re-loaded!	
		var noofcard = test.length;
		//alert(test);

		//alert(noofcard);
		var mem_photo = '';
		var validity = '';
		var name = '';
		for(j = 0; j<test.length; j++)
		{
			
			member_id = test[j].member_id;						
			
			//alert(member_id + ' - ' + name);

			m_type = test[j].m_type;
			address = urldecode(test[j].address);
			mobile_member = test[j].mobile_member;
			emergency_no = test[j].emergency_no;
			membership_id = urldecode(test[j].membership_id);
			if(member_id2 == member_id)
			{
				mem_photo = test[j].mem_photo;
				name = urldecode(test[j].name);
				validity = test[j].validity;
				break;
				//alert(mem_photo);
			}
		}
	
		photo1 = '';
		validity1 = '';
		if(mem_photo.length>0)
		{
			photo1 = '<img width="70" height="70" src="' + mem_photo + '" align="center">	';
			//alert(photo1);
		}
		if(validity.length>0)
		{
			validity1 = '<h5 class="h5">Valid upto : ' + validity +'</h5>';
		}			
		visitor_info1 = photo1 + '<h1 class="stitle1">' + name + '</span></h1>' + validity1;
									
		$("#visitor_info1").html(visitor_info1);
		$("#lastticketid").html(ticket1);
		$("#ShowmyTicket").popup( "open" );
}

function showids()
{
	var test2 = localStorage.getItem("sess_member_list");
	//alert(test2);
	test = JSON.parse(test2); //var test is now re-loaded!	
	var noofcard = test.length;
	//alert(test);

	//alert(noofcard);
	if(noofcard == 1)
	{

		for(j = 0; j<test.length; j++)
		{
			
			member_id = test[j].member_id;						
			name = urldecode(test[j].name);
			//alert(member_id + ' - ' + name);

			m_type = test[j].m_type;
			address = urldecode(test[j].address);
			mobile_member = test[j].mobile_member;
			emergency_no = test[j].emergency_no;
			membership_id = urldecode(test[j].membership_id);
			balance = test[j].balance;
			validity = test[j].validity;
			mem_photo = test[j].mem_photo;
			v_status = test[j].v_status;
			recharg_amt = test[j].recharg_amt;
			dateofrecharge = test[j].dateofrecharge;
			trans_amt = test[j].trans_amt;
			trans_date = test[j].trans_date;
			service_name = test[j].service_name;
				
			//var ownername = $("#data_owner_names").val();
			//var co_ownername = $("#data_co_owner_names").val();
				
			var ownername = urldecode(localStorage.getItem("sess_data_owner_names"));
			var co_ownername = urldecode(localStorage.getItem("sess_data_co_owner_names"));
							
			//var ownername = $("#data_owner_names").val();
			//var co_ownername = $("#data_co_owner_names").val();
				
			Showmyid(member_id ,name ,validity ,m_type, ownername, address, mobile_member, emergency_no, membership_id, mem_photo, v_status ,'template1');
			///return false;

			//var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity; 
		 }
	}else
	{
		
		var idc1 = '';
		var idpar = '';
		//owner_names = 
		
		for(j = 0; j<test.length; j++)
		{
			
			member_id = test[j].member_id;						
			name = urldecode(test[j].name);
			//alert(member_id + ' - ' + name);

			m_type = test[j].m_type;
			address = urldecode(test[j].address);
			mobile_member = test[j].mobile_member;
			emergency_no = test[j].emergency_no;
			membership_id = urldecode(test[j].membership_id);
			balance = test[j].balance;
			validity = test[j].validity;
			mem_photo = test[j].mem_photo;
			v_status = test[j].v_status;
			recharg_amt = test[j].recharg_amt;
			dateofrecharge = test[j].dateofrecharge;
			trans_amt = test[j].trans_amt;
			trans_date = test[j].trans_date;
			service_name = test[j].service_name;
				
			//var ownername = $("#data_owner_names").val();
			//var co_ownername = $("#data_co_owner_names").val();
				
			var ownername = urldecode(localStorage.getItem("sess_data_owner_names"));
			var co_ownername = urldecode(localStorage.getItem("sess_data_co_owner_names"));
			
			idpar = "'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ mem_photo + "','"+ v_status + "'," + "'template2'";
			//alert(idpar);
			//return false;
			
			idc1 += '<div class="book1">';
			//idc1 += '<div class="b2full">';
			//idc1 += '<a href="#" onclick="Showmyid(' + idpar + ');" data-rel="popup"><h5 class="h5"><strong>' + name + '  </strong> (' + membership_id + ')</h5></a>';
			
			idc1 += '<div class="b1"><img width="40" height="40" src="' + mem_photo + '" align="left"></div>';
			idc1 += '<div class="b2"><h1 class="btitle">' + name +'</h1></div>';
			idc1 += '<div class="b3"> ' + '<a href="#" onclick="Showmyid(' + idpar + ');" data-rel="popup">' + '<input value="View" class="right signin bookbtn" data-role="none" type="submit"></a></div>';
				
			//alert(idc1);
			//return false;
			//idc1 += '</div>';
			idc1 += '</div> ';
			idc1 += "\n";	
			
			//var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity; 

		 }
		 console.log(idc1);
		 //alert(idc1);
		 //return false;
	 
		$("#memcarddata1").html('');
		$("#memcarddata1").html(idc1);
		$.mobile.changePage( "#showmultiplemembers",null, true, true);
	}
	//Showmyid(1, 'Anil', '10 jan 2017', 'O', 'Mishra', 'EMP Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', 'template1');
}

function showids_working()
{
	
	var noofcard = $('#data_idcard > option').length;
	if(noofcard == 0)
	{
	
		//$.mobile.loading( 'show', {
		//			text: 'Lading IDs ...',
		//			textVisible: true,
		//			theme: 'a',
		//			html: ""
		//		});	
		//$.mobile.loading( "show" );
				
		//setTimeout(function(){
		//	$.mobile.loading( "hide" );
		//		
		//	//alert('hello');
		//	showids();
		//},5000); 
		//alert('calling .......');
		//GetIDDetailsInfo();
		//var noofcard = $('#data_idcard > option').length;
	}
	//alert(noofcard);
	if(noofcard == 1)
	{
		 $("#data_idcard option").each(function(i)
		 {
			val = $(this).val();
			text = $(this).text();
			//alert(text + " : " + val);
			if(val.length >0)
			{
				var divided2 = text.split("###");
				var member_id = divided2[0];
				var name = urldecode(divided2[1]);
				var m_type = divided2[2];
				var address = urldecode(divided2[3]);
				var mobile_member = divided2[4];		
				var emergency_no = divided2[5];		
				var membership_id = urldecode(divided2[6]);		
				var balance = divided2[7];		
				var validity = divided2[8];	
				var image = urldecode(divided2[9]);	
				var val_status = divided2[10];	
				//var ownername = image = val_status = '';
				//var val_status = '1'
				//alert(service_name);
				//alert(service_logo);
				
				
				var ownername = $("#data_owner_names").val();
				var co_ownername = $("#data_co_owner_names").val();
					
				idpar = "'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ image + "','"+ val_status + "'"
				//alert(idpar);
				//return false;
				//Showmyid("'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ image + "','"+ val_status + "'");
				
				Showmyid(member_id ,name ,validity ,m_type, ownername, address, mobile_member, emergency_no, membership_id, image, val_status ,'template1');
				///return false;

				//var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity; 
			}
			
		 });
		 
	}else
	{
		
		var idc1 = '';
		var idpar = '';
		//owner_names = 
		 $("#data_idcard option").each(function(i)
		 {
			val = $(this).val();
			text = $(this).text();
			//alert(text + " : " + val);
			if(val.length >0)
			{
				var divided2 = text.split("###");
				var member_id = divided2[0];
				var name = urldecode(divided2[1]);
				var m_type = divided2[2];
				var address = urldecode(divided2[3]);
				var mobile_member = divided2[4];		
				var emergency_no = divided2[5];		
				var membership_id = urldecode(divided2[6]);		
				var balance = divided2[7];		
				var validity = divided2[8];	
				var image = urldecode(divided2[9]);	
				var val_status = divided2[10];	
				//var ownername = image = val_status = '';
				//var val_status = '1'
				//alert(service_name);
				//alert(service_logo);
				
				
				var ownername = $("#data_owner_names").val();
				var co_ownername = $("#data_co_owner_names").val();
					
				idpar = "'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ image + "','"+ val_status + "'," + "'template2'";
				//alert(idpar);
				//return false;
				

		
				idc1 += '<div class="book1">';
				//idc1 += '<div class="b2full">';
				//idc1 += '<a href="#" onclick="Showmyid(' + idpar + ');" data-rel="popup"><h5 class="h5"><strong>' + name + '  </strong> (' + membership_id + ')</h5></a>';
				
				idc1 += '<div class="b1"><img width="40" height="40" src="' + image + '" align="left"></div>';
				idc1 += '<div class="b2"><h1 class="btitle">' + name +'</h1></div>';
				idc1 += '<div class="b3"> ' + '<a href="#" onclick="Showmyid(' + idpar + ');" data-rel="popup">' + '<input value="View" class="right signin bookbtn" data-role="none" type="submit"></a></div>';
				
				//alert(idc1);
				//return false;
				//idc1 += '</div>';
				idc1 += '</div> ';
				idc1 += "\n";	
				
				//var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity; 
			}
			
		 });
		 console.log(idc1);
		 //alert(idc1);
		 //return false;
	 
		$("#memcarddata1").html('');
		$("#memcarddata1").html(idc1);
		$.mobile.changePage( "#showmultiplemembers",null, true, true);
	}
	//Showmyid(1, 'Anil', '10 jan 2017', 'O', 'Mishra', 'EMP Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', 'template1');
}

function showids1()
{
	//alert('showing popup');
	//Showmyid(1, 'Anil', '10 jan 2017', 'O', 'Mishra', 'EMP Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', 'template1');
}

function Showmyid(id, name, validity, m_type, ownername, address, contact, emegency_no, cardno, image, val_status, template)
{
		//alert(id);
		//alert(name);
		address = urldecode(address);
			
		var v_class = '';
		if(val_status == '0')
		{
			v_class = 'validity';
		}
		var typeimage = '';
		if(m_type == 'O')
		{
			typeimage = 'Owner.png';
		}
		if(m_type == 'T')
		{
			typeimage = 'Tenant.png';
		}		
		if(m_type == 'D')
		{
			typeimage = 'Dependent.png';
		}		
		if(m_type == 'P')
		{
			typeimage = 'premium.jpg';
		}
		
		//myidcard =' <a href="#" onclick="ClosePopup();" class="ncp-popup-close">X</a>	';	
		//myidcard =' <a href="#" data-rel="back" class="ncp-popup-close">X</a>	';	
		if(template == 'template1')
		{
			myidcard =' <a href="#" data-history="false" onclick="closepop(' + "'#ShowmyID1');" + '" class="ncp-popup-close">X</a>	';
		}else
		{
			myidcard =' <a href="#" data-history="false" onclick="closepop(' + "'#ShowmyID2');" + '" class="ncp-popup-close">X</a>	';
			//myidcard =' <a href="#" data-history="false" data-rel="back" class="ncp-popup-close">X</a>	';
		}
			
		myidcard +='			<div class="ncp-popup-container ' + v_class + '">';
		myidcard += '			<img width="50" height="50" src="images/' + typeimage + '" class="premium" align="right">';
		myidcard += '		 <div class="clear"></div>';
		myidcard += '		<div class="ncp-popup-content roundinner spopup" align="center">';
		myidcard += '		<img width="120" height="120" src="' + image + '" align="center">';
		myidcard += '			<h1 class="stitle1">' + name +'</h1>';
		
		if(m_type != 'O')
		{
			myidcard += '			<h5 class="h5">Valid upto : ' + validity + '</h5>';
		}
		myidcard += '			<p class="showid">';
		//myidcard += '			 <span id="myidshow">';
		myidcard += '				' + ownername + '<br/>';
		myidcard += '				' + address + '<br/>';
		myidcard += '				Contact : ' + contact + '<br/>';
		myidcard += '				Emergency : ' + emegency_no + '<br/><br/>';
	
		myidcard += '				<strong class="cardnumber">' + cardno + '</strong>';
		//myidcard += '			 </span>';
					 
		myidcard += '			</p>';
		myidcard += '		</div>';
		myidcard += '	</div>';
		console.log(myidcard);
		
		//alert(template);
		if(template == 'template1')
		{
			$("#myidshow1").html(myidcard);
			$("#ShowmyID1").popup( "open" );
		}
		else
		{
			$("#myidshow2").html(myidcard);
			$("#ShowmyID2").popup( "open" );
		}
		//alert(myidcard);return false;
		
}

function showbalance()
{
	var test2 = localStorage.getItem("sess_member_list");
	//alert(test2);
	test = JSON.parse(test2); //var test is now re-loaded!	
	var noofcard = test.length;
	//alert(test);

	//alert(noofcard);
	if(noofcard == 1)
	{
		for(j = 0; j<test.length; j++)
		{
			
			member_id = test[j].member_id;						
			name = urldecode(test[j].name);
			//alert(member_id + ' - ' + name);

			m_type = test[j].m_type;
			address = urldecode(test[j].address);
			mobile_member = test[j].mobile_member;
			emergency_no = test[j].emergency_no;
			membership_id = urldecode(test[j].membership_id);
			balance = test[j].balance;
			validity = test[j].validity;
			mem_photo = test[j].mem_photo;
			v_status = test[j].v_status;
			recharg_amt = test[j].recharg_amt;
			dateofrecharge = urldecode(test[j].dateofrecharge);
			trans_amt = test[j].trans_amt;
			trans_date = urldecode(test[j].trans_date);
			service_name = urldecode(test[j].service_name);
				
			//var ownername = $("#data_owner_names").val();
			//var co_ownername = $("#data_co_owner_names").val();
				
			var ownername = urldecode(localStorage.getItem("sess_data_owner_names"));
			var co_ownername = urldecode(localStorage.getItem("sess_data_co_owner_names"));		
						
			idpar = "'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ mem_photo + "','"+ v_status + "'"
			//alert(idpar);
			//return false;
			
			ShowmyBalance(member_id ,name ,validity ,m_type, ownername, address, mobile_member, emergency_no, membership_id, mem_photo, v_status, balance, recharg_amt, dateofrecharge, trans_amt, trans_date,service_name,'template1');
			///return false;
			//var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity; 
		}	
		 
	}else
	{
		
		var idc1 = '';
		var idpar = '';
		//owner_names = 
		
		for(j = 0; j<test.length; j++)
		{
			
			member_id = test[j].member_id;						
			name = urldecode(test[j].name);
			//alert(member_id + ' - ' + name);

			m_type = test[j].m_type;
			address = urldecode(test[j].address);
			mobile_member = test[j].mobile_member;
			emergency_no = test[j].emergency_no;
			membership_id = urldecode(test[j].membership_id);
			balance = test[j].balance;
			validity = test[j].validity;
			mem_photo = test[j].mem_photo;
			v_status = test[j].v_status;
			recharg_amt = test[j].recharg_amt;
			dateofrecharge = urldecode(test[j].dateofrecharge);
			trans_amt = test[j].trans_amt;
			trans_date = urldecode(test[j].trans_date);
			service_name = test[j].service_name;
				
			//var ownername = $("#data_owner_names").val();
			//var co_ownername = $("#data_co_owner_names").val();
				
			var ownername = urldecode(localStorage.getItem("sess_data_owner_names"));
			var co_ownername = urldecode(localStorage.getItem("sess_data_co_owner_names"));			

			idpar = "'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ mem_photo + "','"+ v_status + "','"+ balance + "','"+ recharg_amt + "','"+ dateofrecharge + "','"+ trans_amt + "','"+ trans_date + "','"+ service_name + "'," + "'template2'";
			//alert(idpar);
			//return false;
			
			idc1 += '<div class="book1">';
			//idc1 += '<div class="b2full">';
			//idc1 += '<a href="#" onclick="ShowmyBalance(' + idpar + ');" data-rel="popup"><h5 class="h5"><strong>' + name + '  </strong> (' + membership_id + ')</h5></a>';
			idc1 += '<div class="b1"><img width="40" height="40" src="' + mem_photo + '" align="left"></div>';
			idc1 += '<div class="b2"><h1 class="btitle">' + name +'</h1></div>';
			idc1 += '<div class="b3"> ' + '<a href="#" onclick="ShowmyBalance(' + idpar + ');" data-rel="popup">' + '<input value="View" class="right signin bookbtn" data-role="none" type="submit"></a></div>';
			
			//alert(idc1);
			//return false;
			//idc1 += '</div>';
			idc1 += '</div>';
			idc1 += "\n";	
			
			//var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity; 
		}
			
		 console.log(idc1);
		 //alert(idc1);
		 //return false;
	 
		$("#membaldata1").html('');
		$("#membaldata1").html(idc1);
		$.mobile.changePage( "#showmultiplebalance",null, true, true);
	}
	
	//ShowmyBalance(1, 'Anil', '10 jan 2017', 'T', 'Pandy', 'Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', '100.89', '500', '20-Apr-2017', '50', '18-Jan-2016','Cricket','template1')
	//ShowmyBalance(1, 'Anil', '10 jan 2017', 'T', 'Pandy', 'Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', '100.89', '', '', '', '','','template1')
}

function showbalance_working()
{
	var noofcard = $('#data_idcard > option').length;
	if(noofcard == 0)
	{
		//$.mobile.loading( 'show', {
		//			text: 'Lading Balance ...',
		//			textVisible: true,
		//			theme: 'a',
		//			html: ""
		//		});	
		//$.mobile.loading( "show" );
				
		//setTimeout(function(){
		//	$.mobile.loading( "hide" );
				
			//alert('hello');
		//	showbalance();
		//},5000); 
		//alert('calling .......');
			//GetIDDetailsInfo();
			//var noofcard = $('#data_idcard > option').length;
				
		//alert('calling .......');
		//GetIDDetailsInfo();
		//var noofcard = $('#data_idcard > option').length;
	}
	//alert(noofcard);
	if(noofcard == 1)
	{
		 $("#data_idcard option").each(function(i)
		 {
			val = $(this).val();
			text = $(this).text();
			//alert(text + " : " + val);
			if(val.length >0)
			{
				var divided2 = text.split("###");
				var member_id = divided2[0];
				var name = urldecode(divided2[1]);
				var m_type = divided2[2];
				var address = urldecode(divided2[3]);
				var mobile_member = divided2[4];		
				var emergency_no = divided2[5];		
				var membership_id = urldecode(divided2[6]);		
				var balance = divided2[7];		
				var validity = divided2[8];	
				var image = urldecode(divided2[9]);	
				var val_status = divided2[10];	
				var recharg_amt = divided2[11];	
				var dateofrecharge = urldecode(divided2[12]);	
				var trans_amt = divided2[13];	
				var trans_date = urldecode(divided2[14]);	
				var service_name = urldecode(divided2[15]);					
				//var ownername = image = val_status = '';
				//var val_status = '1'
				//alert(service_name);
				//alert(service_logo);
				
				
				var ownername = $("#data_owner_names").val();
				var co_ownername = $("#data_co_owner_names").val();
					
				idpar = "'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ image + "','"+ val_status + "'"
				//alert(idpar);
				//return false;
				//Showmyid("'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ image + "','"+ val_status + "'");
				
				ShowmyBalance(member_id ,name ,validity ,m_type, ownername, address, mobile_member, emergency_no, membership_id, image, val_status, balance, recharg_amt, dateofrecharge, trans_amt, trans_date,service_name,'template1');
				///return false;
				//var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity; 
			}
			
		 });
		 
	}else
	{
		
		var idc1 = '';
		var idpar = '';
		//owner_names = 
		 $("#data_idcard option").each(function(i)
		 {
			val = $(this).val();
			text = $(this).text();
			//alert(text + " : " + val);
			if(val.length >0)
			{
				var divided2 = text.split("###");
				var member_id = divided2[0];
				var name = urldecode(divided2[1]);
				var m_type = divided2[2];
				var address = urldecode(divided2[3]);
				var mobile_member = divided2[4];		
				var emergency_no = divided2[5];		
				var membership_id = urldecode(divided2[6]);		
				var balance = divided2[7];		
				var validity = divided2[8];	
				var image = urldecode(divided2[9]);	
				var val_status = divided2[10];	
				var recharg_amt = divided2[11];	
				var dateofrecharge = urldecode(divided2[12]);	
				var trans_amt = divided2[13];	
				var trans_date = urldecode(divided2[14]);	
				var service_name = urldecode(divided2[15]);	
				//var ownername = image = val_status = '';
				//var val_status = '1'
				//alert(service_name);
				//alert(service_logo);
				
				
				var ownername = $("#data_owner_names").val();
				var co_ownername = $("#data_co_owner_names").val();
					
				idpar = "'" + member_id + "','"+ name + "','"+ validity + "','"+ m_type + "','"+ ownername + "','"+ address + "','"+ mobile_member + "','"+ emergency_no + "','"+ membership_id + "','"+ image + "','"+ val_status + "','"+ balance + "','"+ recharg_amt + "','"+ dateofrecharge + "','"+ trans_amt + "','"+ trans_date + "','"+ service_name + "'," + "'template2'";
				//alert(idpar);
				//return false;
				
				idc1 += '<div class="book1">';
				//idc1 += '<div class="b2full">';
				//idc1 += '<a href="#" onclick="ShowmyBalance(' + idpar + ');" data-rel="popup"><h5 class="h5"><strong>' + name + '  </strong> (' + membership_id + ')</h5></a>';
				idc1 += '<div class="b1"><img width="40" height="40" src="' + image + '" align="left"></div>';
				idc1 += '<div class="b2"><h1 class="btitle">' + name +'</h1></div>';
				idc1 += '<div class="b3"> ' + '<a href="#" onclick="ShowmyBalance(' + idpar + ');" data-rel="popup">' + '<input value="View" class="right signin bookbtn" data-role="none" type="submit"></a></div>';
				
				//alert(idc1);
				//return false;
				//idc1 += '</div>';
				idc1 += '</div>';
				idc1 += "\n";	
				
				//var main_serv2 = member_id + "###" + name + "###" + m_type + "###" + address + "###" + mobile_member+ "###" +emergency_no + "###" +membership_id + "###" +balance + "###" +validity; 
			}
			
		 });
		 console.log(idc1);
		 //alert(idc1);
		 //return false;
	 
		$("#membaldata1").html('');
		$("#membaldata1").html(idc1);
		$.mobile.changePage( "#showmultiplebalance",null, true, true);
	}
	
	//ShowmyBalance(1, 'Anil', '10 jan 2017', 'T', 'Pandy', 'Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', '100.89', '500', '20-Apr-2017', '50', '18-Jan-2016','Cricket','template1')
	//ShowmyBalance(1, 'Anil', '10 jan 2017', 'T', 'Pandy', 'Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', '100.89', '', '', '', '','','template1')
}

function showbalance1()
{
	ShowmyBalance(1, 'Anil', '10 jan 2017', 'T', 'Pandy', 'Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', '100.89', '500', '20-Apr-2017', '50', '18-Jan-2016','Cricket','template1')
	//ShowmyBalance(1, 'Anil', '10 jan 2017', 'T', 'Pandy', 'Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', '100.89', '', '', '', '','',','template1')
}

function ShowmyBalance(id, name, validity, m_type, ownername, address, contact, emegency_no, cardno, image, val_status, balance, recharg_amt, dateofrecharge, trans_amt, trans_date, service_name, template)
{
		//alert(id);
		//alert(ticket_no);
			
		var myidbalance = '';
		
		var v_class = '';
		if(val_status == '1')
		{
			v_class = 'validity';
		}
		var typeimage = '';
		if(m_type == 'O')
		{
			typeimage = 'Owner.png';
		}
		if(m_type == 'T')
		{
			typeimage = 'Tenant.png';
		}		
		if(m_type == 'D')
		{
			typeimage = 'Dependent.png';
		}		
		if(m_type == 'P')
		{
			typeimage = 'premium.jpg';
		}
		
	
		//myidbalance +=' <a href="#" data-rel="back" class="ncp-popup-close">X</a>';
		
		if(template == 'template1')
		{
			myidbalance =' <a href="#" data-history="false" onclick="closepop(' + "'#ShowmyBalance1');" + '" class="ncp-popup-close">X</a>	';
		}else
		{
			myidbalance =' <a href="#" data-history="false" onclick="closepop(' + "'#ShowmyBalance2');" + '" class="ncp-popup-close">X</a>	';
			//myidbalance =' <a href="#" data-rel="back" class="ncp-popup-close">X</a>	';
		}		
		myidbalance +=' 	<div class="ncp-popup-spacer ncp-popup-small ncp-popup-close-button-out">';
		myidbalance +=' 		<a href="#" class="ncp-popup-close">X</a>';
		myidbalance +=' 		<div class="ncp-popup-container">';
		myidbalance +='			<img width="50" height="50" src="images/' + typeimage + '" class="premium" align="right">';
		myidbalance +=' 			 <div class="clear"></div>';
		myidbalance +=' 			<div class="ncp-popup-content roundinner spopup" align="center">';
		myidbalance +='		<img width="120" height="120" src="' + image + '" align="center">';
		myidbalance += '			<h1 class="stitle1">' + name +'</h1>';
		if(m_type != 'O')
		{
			myidbalance += '			<h5 class="h5">Valid upto : ' + validity + '</h5>';
		}


		myidbalance +=' 				<p class="showid">';
					 
		myidbalance +=' Account Balance: INR ' + balance + '<br/>';
		 
		if(recharg_amt.length>0)
		{
			myidbalance +=' Last Recharge Transaction <br/>';
			myidbalance +=' Date: ' + dateofrecharge + '<br/>';
			myidbalance +=' Amt: Rs ' + recharg_amt + ' <br/>';
		}
		
		if(trans_amt.length>0)
		{
			myidbalance +=' Last Service Transaction <br/>';
		 	myidbalance +=' Date: ' + trans_date + '<br/>';
			myidbalance +=' Amt: Rs ' + trans_amt +' (' + service_name + ') <br/><br/><br/>';
		}

		myidbalance +=' 				</p>';
		myidbalance +=' 			</div>';
		myidbalance +=' 		</div>';
		myidbalance +=' 	</div>';
	
	

		console.log(myidbalance);
				
		//alert(template);
		if(template == 'template1')
		{
			$("#mybalanceshow1").html(myidbalance);
			$("#ShowmyBalance1").popup( "open" );
		}
		else
		{
			$("#mybalanceshow2").html(myidbalance);
			$("#ShowmyBalance2").popup( "open" );
		}
		
}
	
function ListTicket(last)
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/list_ticket/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'list_ticket/' + ourclub_id;
	url = serviceURL + 'list_ticket/' + localStorage.session_id_club_id;
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Ticket ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
		//return false;
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			//console.log(result.message);
			//alert(Object.keys(result.data.service).length);

			//alert(localStorage.session_id_local);
			
			$("#liveticket1").html('');
			
			var info1 = '';
			var info2 = '';
			if(last == '1')
			{
					service_id = result.data.service[0].service_id;

					service_name = result.data.service[0].service_name;
					sticket_id = result.data.service[0].sticket_id;
					ticket_no = result.data.service[0].ticket_no;
					//service_logo = result.data.service[0].ticket_logo;
					//s_validity = result.data.service[0].s_validity;
					//chargeable = result.data.service[0].chargeable;
					//charges = result.data.service[0].charges;
					s_validity = '';
					comments = result.data.service[0].comments;
					datec = result.data.service[0].datec;
					service_date = result.data.service[0].service_date;
					service_slot = result.data.service[0].service_slot;
					service_court = result.data.service[0].service_court;
					timing = result.data.service[0].timing;
					member_id = result.data.service[0].member_id;
					court_name = result.data.service[0].court_name;
					ticket_type = result.data.service[0].ticket_type;
					extra_info = result.data.service[0].extra_info;
					future_booking = result.data.service[0].future_booking;
					no_of_member = result.data.service[0].no_of_member;
					book_type = result.data.service[0].book_type;
					//alert(service_name);
					ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
					//ticket_url = '';
					img = '<img src="' + ticket_url + '" >';
					//console.log(service_name);
					//console.log(img);
					//alert(service_name);
					mypar = sticket_id + ", '" + service_name + "', '" +  ticket_no + "', '"+  ticket_type + "', '"+  datec + "', '"+  service_date + "', '"+  timing + "', '"+  court_name + "', '"+  member_id + "'";
					no_of_member2='';
					if(no_of_member>1)
					{
						no_of_member2 = " - " + no_of_member;
					}
					
					info1 += '<div class="book1">';
					info1 += '<div class="b2full">';
		
					//info1 += '<a href="#ShowmyTicket" data-rel="popup"><h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					//info1 += '<a href="#" onclick="mypopup(' + mypar + ')";><h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					if(book_type == 'C' && future_booking == 'N')
					{
						info1 += '<a href="#" onclick="mypopup(' + mypar + ')";><h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					}else
					{
						info1 += '<a href="#"><h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					}					
					info1 += '<strong>Ticket ID:</strong> ' + ticket_no + ' (' + ticket_type + no_of_member2 +')<br>';
					info1 += '<strong>Booking Date:</strong> ' + datec + '<br>';
					if(book_type == 'T')
					{
						//booking_type = 'Tentative';
						info1 += '<strong>Booking Type:</strong> Tentative<br>';
					}
						
					
					info1 += '<!--<strong>Ticket Type</strong>: Member<br>-->';
					info1 += ' <strong>Service Date</strong>: ' + service_date + ' (' + timing + ')<br>';			
					if(extra_info == '1')
					{
						//info1 += service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + timing + "<br>Court: " + court_name + "<br>Ticket Type: " + ticket_type ;
						// + "<br>Validity: " + s_validity
						info1 += ' <strong>Court</strong>: ' + court_name;						
					}					
					info1 += '</h5>';
					info1 += '</a>';
					info1 += '</div>';
					info1 += '</div>  <!-- book1 -->';		
					
					//alert(info1);
					$("#liveticket1").html(info1);				
			}
			else
			{
				var info1 = '';
				var info2 = '';
				for(i=0; i<Object.keys(result.data.service).length; i++)
				{
					service_id = result.data.service[i].service_id;
					service_name = result.data.service[i].service_name;
					//service_logo = result.data.service[i].ticket_logo;
					//s_validity = result.data.service[i].s_validity;
					s_validity = '';
					sticket_id = result.data.service[i].sticket_id;
					ticket_no = result.data.service[i].ticket_no;
					//chargeable = result.data.service[i].chargeable;
					//charges = result.data.service[i].charges;
					comments = result.data.service[i].comments;
					datec = result.data.service[i].datec;
					service_date = result.data.service[i].service_date;
					service_slot = result.data.service[i].service_slot;
					member_id = result.data.service[i].member_id;
					timing = result.data.service[i].timing;
					court_name = result.data.service[i].court_name;
					service_court = result.data.service[i].service_court;
					ticket_type = result.data.service[i].ticket_type;
					extra_info = result.data.service[i].extra_info;
					future_booking = result.data.service[i].future_booking;
					no_of_member = result.data.service[i].no_of_member;
					book_type = result.data.service[i].book_type;
					//alert(service_name);
					//alert(member_id);
					
					ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
					//ticket_url = '';
					img = '<img src="' + ticket_url + '" >';
					//console.log(ticket_url);
					//console.log(img);
					//service_name,datec,s_validity
					//console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + sticket_id + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "</a></li>");
					
					mypar = sticket_id + ", '" + service_name + "', '" +  ticket_no + "', '"+  ticket_type + "', '"+  datec + "', '"+  service_date + "', '"+  timing + "', '"+  court_name + "', '"+  member_id + "'";
					//alert(mypar);//return false;

					no_of_member2 ='';
					if(no_of_member>1)
					{
						no_of_member2 = " - " + no_of_member;
					}
					
					info1 += '<div class="book1">';
					info1 += '<div class="b2full">';		
					//info1 += '<a href="#ShowmyTicket" data-rel="popup"><h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					
					if(book_type == 'C' && future_booking == 'N')
					{
						info1 += '<a href="#" onclick="mypopup(' + mypar + ')";><h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					}else
					{
						info1 += '<a href="#"><h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					}	
					
					info1 += '<strong>Ticket ID:</strong> ' + ticket_no + ' (' + ticket_type + no_of_member2 +')<br>';
					info1 += '<strong>Booking Date:</strong> ' + datec + '<br>';
					if(book_type == 'T')
					{
						//booking_type = 'Tentative';
						info1 += '<strong>Booking Type:</strong> Tentative<br>';
					}
					info1 += '<!--<strong>Ticket Type</strong>: Member<br>-->';
					info1 += ' <strong>Service Date</strong>: ' + service_date + ' (' + timing + ')<br>';			
					if(extra_info == '1')
					{
						//info1 += service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + timing + "<br>Court: " + court_name + "<br>Ticket Type: " + ticket_type ;
						// + "<br>Validity: " + s_validity
						info1 += ' <strong>Court</strong>: ' + court_name;						
					}else
					{
						//info1 += service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Ticket Type: " + ticket_type ;
						// + "<br>Validity: " + s_validity					
					}
					clickinfo =  "'" + sticket_id + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "', '" + service_date+ "','" + timing+ "','" + court_name+ "','" + ticket_type + "','" + extra_info + "'";
					//alert(clickinfo);
					
					info1 += '</h5>';
					info1 += '</a>';
					info1 += '</div>';
					info1 += '</div>  <!-- book1 -->';		

					
				}
				if(i == 0)
				{
					//alert('no ticket');
					$("#liveticket1").html("<center>Active Ticket is not available.</center>");
				}else
				{
					//alert(info1);
					$("#liveticket1").html(info1);
				}
				$.mobile.changePage( "#show_service_ticket",null, true, true);

			}

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}


function TransTicket()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/service_history/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'service_history/' + ourclub_id;
	url = serviceURL + 'service_history/' + localStorage.session_id_club_id;
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Service History ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#service_history",null, true, true);
			$("#history1").html('');
			
			var b1 = '';
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				service_id = result.data.service[i].service_id;
				service_name = result.data.service[i].service_name;
				service_logo = result.data.service[i].ticket_logo;
				s_validity = result.data.service[i].s_validity;
				sticket_id = result.data.service[i].sticket_id;
				ticket_no = result.data.service[i].ticket_no;
				chargeable = result.data.service[i].chargeable;
				//charges = result.data.service[i].charges;
				comments = result.data.service[i].comments;
				datec = result.data.service[i].datec;
				service_date = result.data.service[i].service_date;
				service_slot = result.data.service[i].service_slot;
				timing = result.data.service[i].timing;
				court_name = result.data.service[i].court_name;
				service_court = result.data.service[i].service_court;
				ticket_type = result.data.service[i].ticket_type;
				extra_info = result.data.service[i].extra_info;				
				ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
				//ticket_url = '';
				img = '<img src="' + ticket_url + '" >';
				
				// + "<br>Validity: " + s_validity
				if(extra_info == '1')
				{
					info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + timing + "<br>Court: " + court_name + "<br>Ticket Type: " + ticket_type ;
					
					b1 += '<div class="book1 validitys">    	 	<div class="b2full">';
        	
					b1 += '<h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					b1 += '  <strong>Booking Date:</strong> ' + datec + '<br>';
					b1 += '  <strong>Service Date</strong>: ' + service_date + ' ' + timing + '<br>';
					//b1 += '  <strong>Court Name</strong>: ' + court_name + '<br>';
					//b1 += '  <strong>Ticket Type</strong>: ' + ticket_type + '<br>';
					//b1 += '  <strong>Timing:</strong> ' + timing + '<br>';

					b1 += '</h5>';
					b1 += '</div></div>';
					b1 += "\n\n";
				}else
				{
					info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Ticket Type: " + ticket_type ;
					
					b1 += '<div class="book1 validitys">    	 	<div class="b2full">';
					
					b1 += '<h5 class="h5"><strong>Service:</strong> ' + service_name + '<br>';
					b1 += '  <strong>Booking Date:</strong> ' + datec + '<br>';
					b1 += '  <strong>Service Date</strong>: ' + service_date + ' ' + timing + '<br>';
					//b1 += '  <strong>Ticket Type</strong>: ' + ticket_type + '<br>';
					//b1 += '  <strong>Timing:</strong> ' + timing + '<br>';

					b1 += '</h5>';
					b1 += '</div></div>';	
					b1 += "\n\n";					
					
				}
					
				//alert(service_name);
				//alert(info1);
				console.log(service_name);
				console.log(img);
				//service_name,datec,s_validity
				console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Booking Date: " + datec + "<br>Validity: " + s_validity + "</a></li>");
				
				//$("#sum_list_afterlogin_list").append("<li>" + info1 + "</li>").listview("refresh");
				//$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
									
				//console.log(result[0][i].Location);
				
				//$("#sum_list_afterlogin_list").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
			}
			
			
			//alert(b1);
			$("#history1").html(b1);
			if(i == 0)
			{
				//alert('no ticket');
				$("#history1").html("<li><center>Service History not available.</center></li>");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function MyMessage()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/my_message/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'my_message/' + ourclub_id;
	url = serviceURL + 'my_message/' + localStorage.session_id_club_id;
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Messages ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#messages",null, true, true);
			$("#history2").html('');
			
			var b1 = '';
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				tran_amt = result.data.service[i].tran_amt;
				aval_bal = result.data.service[i].aval_bal;
				tran_type = result.data.service[i].tran_type;
				datec = result.data.service[i].datec;
				message = urldecode(result.data.service[i].message);

				//info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + timing + "<br>Court: " + court_name + "<br>Ticket Type: " + ticket_type ;
					
					b1 += '<div class="book1">    	 	<div class="b2full">';
        	
					b1 += '<h5 class="h5"><strong></strong> ' + message + '<br>';
					//b1 += '  <strong>Amt:</strong> ' + tran_amt + ' (' + tran_type + ')' + '<br>';
					b1 += '  <strong>Date</strong>: ' + datec + '<br>';
					//b1 += '  <strong>Court Name</strong>: ' + court_name + '<br>';
					//b1 += '  <strong>Ticket Type</strong>: ' + ticket_type + '<br>';
					//b1 += '  <strong>Timing:</strong> ' + timing + '<br>';

					b1 += '</h5>';
					b1 += '</div></div>';
					b1 += "\n\n";
			
					
				//alert(service_name);
				//alert(info1);
				console.log(service_name);

			}
			
			
			//alert(b1);
			$("#message").html(b1);
			if(i == 0)
			{
				//alert('no ticket');
				$("#message").html("<li><center>Messages not available.</center></li>");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function MyEvents(type)
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&type=" +type;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/my_message/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'my_message/' + ourclub_id;
	url = serviceURL + 'list_events/' + localStorage.session_id_club_id;
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Events ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#events",null, true, true);
			$("#events_main").html('');
			
			var b1 = '';
			for(i=0; i<Object.keys(result.data.events).length; i++)
			{
				event_id = result.data.events[i].event_id;
				datec = result.data.events[i].datec;
				event_name = urldecode(result.data.events[i].event_name);
				event_desc = urldecode(result.data.events[i].event_desc);
				start_date = result.data.events[i].start_date;
				end_date = result.data.events[i].end_date;
				vendor = urldecode(result.data.events[i].vendor);
				event_image = result.data.events[i].event_image;
				event_thumbnail = result.data.events[i].event_thumbnail;
				if(event_image.length !=0)
				{
					event_image = '<img width="250" src="' + event_image + '">';
				}
				if(event_thumbnail.length !=0)
				{
					//event_thumbnail = '<img width="25" src="' + event_thumbnail + '">';
				}
				//info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + timing + "<br>Court: " + court_name + "<br>Ticket Type: " + ticket_type ;
					
					//b1 += '<div class="book1">    	 	<div class="b2full">';
        	
					//b1 += '<h5 class="h5"><strong> ' + event_name + '</strong><br>';
					//b1 += '  <strong>Amt:</strong> ' + tran_amt + ' (' + tran_type + ')' + '<br>';
					//if(event_image.length !=0)
					//{
					//	b1 +=  event_image + '<br>';
					//}
					b1 += '<div class="book1">';					
					if(event_thumbnail.length !=0)
					{
						//b1 +=  event_thumbnail + '<br>';
						b1 += '<div class="b1" style="width:100%">' + '<a href="#" OnClick="EventDetails(' + "'" + event_id + "');" + '">' + '<img style="width:100%;padding:0px;"  src="' + event_thumbnail + '" align="left">'  +'</a>' + '</div>';
					}else
					{	
						b1 += '<div class="b2"><h1 class="btitle"><a href="#" OnClick="EventDetails(' + "'" + event_id + "');" + '">' + event_name +'</a></h1></div>';
					}
					//b1 += event_desc + '<br>';
					//b1 += '  <strong>Date</strong>: ' + start_date + ' - ' + end_date + '<br>';
					//b1 += '  <strong>Court Name</strong>: ' + court_name + '<br>';
					//b1 += '  <strong>Ticket Type</strong>: ' + ticket_type + '<br>';
					//b1 += '  <strong>Timing:</strong> ' + timing + '<br>';

					b1 += '</div>';
					//b1 += '</h5>';
					//b1 += '</div></div>';
					b1 += "\n\n";
			
					
				//alert(b1);
				//alert(info1);
				console.log(service_name);
			}
			
			//alert(b1);
			$("#events_main").html(b1);
			if(i == 0)
			{
				//alert('no ticket');
				$("#events_main").html("<li><center>Events not available.</center></li>");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}


function EventDetails(id)
{		
	//alert(id);
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&event_id=" +id;
	
	
	//return false;
	//http://localhost/h_app/services/my_message/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'my_message/' + ourclub_id;
	url = serviceURL + 'event_details/' + localStorage.session_id_club_id;
	//alert(url);
	//alert(searchparam);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Event details ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#events_details",null, true, true);
			//$("#events_main_details").html('');
			$("#event_data1").html('');
			$("#event_data3").html('');
			
			var b1 = '';
			var b3 = '';
			//alert(Object.keys(result.data).length);
			//for(i=0; i<Object.keys(result.data).length; i++)
			//{
				//alert('aa');
				event_id = result.data.event_id;
				datec = result.data.datec;
				event_name = urldecode(result.data.event_name);
				event_desc = urldecode(result.data.event_desc);
				start_date = result.data.start_date;
				end_date = result.data.end_date;
				vendor = urldecode(result.data.vendor);
				v_contact = urldecode(result.data.v_contact);
				event_image = result.data.event_image;
				event_thumbnail = result.data.event_thumbnail;
				hide_date = result.data.hide_date;
				var event_image2 = '';
				var contact = '';
				//alert(event_name);
				//alert(event_image);

				if(v_contact.length !=0)
				{
					//b1 += '  <strong>Contact</strong>: <a href="tel:' + v_contact + '">' + v_contact + '</a>' + '<br>';
					contact = "<a onclick=CallDetails('" + id+ "','" + v_contact + "'); href='#'><img src='images/call-button.png' style='height:24px;'></a>"; 
					//b3 += '  <strong>Contact</strong>:' + contact  + '<br>';
					//alert(b1);return false;
				}

				b1 += '<div class="book1" style="margin-bottom:0px;margin-left:-13px;">    	 	<div class="b2full">';
				//alert(b1);
				b1 += '<strong> ' + event_name + ' ' + contact + '</strong>';
				//b1 += '  <strong>Amt:</strong> ' + tran_amt + ' (' + tran_type + ')' + '<br>';

				if(event_image.length !=0)
				{
					//event_image = '<div id="wrapper" style="width:100%"><img width="90%" src="' + event_image + '" style="max-width:100%; height:auto;"></div>';
					event_image2 = '<img width="100%" src="' + event_image + '" style="max-width:90%; height:auto;">';
					$("#wrapper").html(event_image2);
					$("#e_img").html(event_image2);
					//alert(event_image2);
					//b1 +=  event_image + '<br>';
				}else
				{
					event_image2 = '<img width="1%" src="http://my.bluapps.in/blank.png" style="max-width:1%; height:auto;">';
					$("#wrapper").html(event_image2);
					$("#e_img").html(event_image2);
				}
				//alert(event_image2);

				//info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + timing + "<br>Court: " + court_name + "<br>Ticket Type: " + ticket_type ;
					
					//alert(event_image.length);
					//b1 += '<div class="book1">';		
					//alert(b1);					
					
					//b1 += '<div class="b2"><h1 class="btitle">' + event_name +'</h1></div>';
				
					//alert(b1);
					//b1 += '<br>' + event_desc + '<br>';

					b3 += '<div class="book1">  <div class="b2full">';
					if(v_contact.length !=0)
					{
						//b1 += '  <strong>Contact</strong>: <a href="tel:' + v_contact + '">' + v_contact + '</a>' + '<br>';
						contact = "<a onclick=CallDetails('" + id+ "','" + v_contact + "'); href='#'>" + v_contact + "</a>"; 
						//b3 += '  <strong>Contact</strong>:' + contact  + '<br>';
						//alert(b1);return false;
					}

					if(hide_date != '1')
					{
						b3 += '  <strong>Date</strong>: ' + start_date + ' - ' + end_date + '<br>';
					}
					//b1 += '  <strong>Court Name</strong>: ' + court_name + '<br>';
					//b1 += '  <strong>Ticket Type</strong>: ' + ticket_type + '<br>';
					//b1 += '  <strong>Timing:</strong> ' + timing + '<br>';

					b1 += '</h5>';
					b1 += '</div></div>';
					b1 += "\n\n";

					b3 += '</div></div>';
			
					//alert(b3);
				//alert(service_name);
				//alert(info1);
				console.log(service_name);

			//}

			$("#event_data1").html(b1);
			$("#event_data3").html(b3);


			myScroll.destroy();
			myScroll = null;
			loaded();  
			//alert('loading'); 
			myScroll.refresh(); 
			
			
			//alert(b1);
			//alert(b3);
			//$("#events_main_details").html(b1);


			//myScroll = new iScroll('wrapper',{ zoom:true, zoomMax: 4, checkDOMChanges:true, onBeforeScrollStart : function(e){ myScroll.refresh(); }} 			);


			if(i == 0)
			{
				//alert('no ticket');
				$("#events_main_details").html("<li><center>Events not available.</center></li>");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});    


}


function CallDetails(id, tel)
{		
	//alert(id);
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	//alert('calling');
	window.location = "tel:" + tel;

	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&event_id=" +id + "&tel=" +tel;
	
	
	//return false;
	//http://localhost/h_app/services/my_message/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'my_message/' + ourclub_id;
	url = serviceURL + 'call_details/' + localStorage.session_id_club_id;
	//alert(url);
	//alert(searchparam);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) 
	{

	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		//showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function TransHistory()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/trans_history/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'trans_history/' + ourclub_id;
	url = serviceURL + 'trans_history/' + localStorage.session_id_club_id;
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Transaction History ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#transaction_history",null, true, true);
			$("#history2").html('');
			
			var b1 = '';
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				tran_amt = result.data.service[i].tran_amt;
				aval_bal = result.data.service[i].aval_bal;
				tran_type = result.data.service[i].tran_type;
				datec = result.data.service[i].datec;
				comments = urldecode(result.data.service[i].comments);

				//info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + timing + "<br>Court: " + court_name + "<br>Ticket Type: " + ticket_type ;
					
					b1 += '<div class="book1">    	 	<div class="b2full">';
        	
					b1 += '<h5 class="h5"><strong>Service:</strong> ' + comments + '<br>';
					b1 += '  <strong>Amt:</strong> ' + tran_amt + ' (' + tran_type + ')' + '<br>';
					b1 += '  <strong>Date</strong>: ' + datec + '<br>';
					//b1 += '  <strong>Court Name</strong>: ' + court_name + '<br>';
					//b1 += '  <strong>Ticket Type</strong>: ' + ticket_type + '<br>';
					//b1 += '  <strong>Timing:</strong> ' + timing + '<br>';

					b1 += '</h5>';
					b1 += '</div></div>';
					b1 += "\n\n";
			
					
				//alert(service_name);
				//alert(info1);
				console.log(service_name);

			}
			
			
			//alert(b1);
			$("#history2").html(b1);
			if(i == 0)
			{
				//alert('no ticket');
				$("#history2").html("<li><center>Transaction History not available.</center></li>");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function TicketID(sticket_id, service_name,datec,s_validity,service_date, service_slot,service_court,ticket_type, extra_info )
{
	//sticket_id + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "', '" + service_date+ "','" + service_slot+ "','" + service_court+ "','" + ticket_type + "','" + extra_info
	//alert('test' + ticket_no);
		//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
		//ticket_url = serviceURL + 'genqr?loc_id=' + ourclub_id + '&ticket_no=' + sticket_id;
		ticket_url = serviceURL + 'genqr?loc_id=' + localStorage.session_id_club_id + '&ticket_no=' + sticket_id;
		//ticket_url = '';
		img = '<img src="' + ticket_url + '" >';
		console.log(service_name);
		console.log(img);
		//alert(img);
		//console.log(charges);
		//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
		
		//alert('generating qr code');
		//TicketID(ticket_no);
		//"<br>Validity: " + s_validity +
		if(extra_info == '1')
		{
			info2 = "Service: " + service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + service_slot + "<br>Court: " + service_court + "<br>Ticket Type: " + ticket_type +  "<br>" + img + "</center><hr><center><img height=\"70\" src=\"" + localStorage.session_id_mem_photo
		}else
		{
			info2 = "Service: " + service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Ticket Type: " + ticket_type + "<br>" + img + "</center><hr><center><img height=\"70\" src=\"" + localStorage.session_id_mem_photo
		}		
		//info2 = "Service: " + service_name + "<br> Booking Date: " + datec + "<br>Validity: " + s_validity + "<br>" + img + "</center><hr><center><img height=\"100\" src=\"" + localStorage.session_id_mem_photo;
		
		$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
		$("#sum_list_afterlogin_list").html('');
			
		$("#sum_list_afterlogin_list").append("<li><center>" + info2 + "\"></center></li>").listview("refresh")		
}

function RechargeHistory()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/trans_history/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'recharge_history/' + ourclub_id;
	url = serviceURL + 'recharge_history/' + localStorage.session_id_club_id;
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Recharges ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#search_result_recharge_history",null, true, true);
			$("#sum_list_recharge_history").html('');
			
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				tran_amt = result.data.service[i].tran_amt;
				aval_bal = result.data.service[i].aval_bal;
				datec = result.data.service[i].datec;
				comments = result.data.service[i].comments;

				$("#sum_list_recharge_history").append("<li><a href=\"#\">Source: " + comments + "<br> Recharge Date: " + datec + "<br>Amount: Rs " + tran_amt + "</a></li>").listview("refresh");
				//$("#sum_list_recharge_history").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
									
				//console.log(result[0][i].Location);
				
				//$("#sum_list_recharge_history").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
			}
			if(i == 0)
			{
				//alert('no ticket');
				$("#sum_list_recharge_history").append("<li><center>Recharge History not available.</center></li>").listview("refresh");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function Recharge()
{	
		charges = 100;
		service_id =1;

		$.mobile.changePage("#search_result_afterlogin_recharge",null, true, true);
		$("#sum_list_afterlogin_recharge").html('');
		
		//alert('aa');
		console.log("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>");
		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");

		charges = 500;

		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");
		
		charges = 1000;
		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");

}

function RecharegAmt(charges)
{
		$("#priceid_recharge").html('Rs ' + charges);

		$("#rechargeamt").val(charges);
		//alert("recharge with " + charges);
		showMessage("Recharging with " + charges,null,'App','OK');
}

function RechargeFinal()
{		
	rechargeamt = $("#rechargeamt").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&amt="+ rechargeamt;
	//alert(searchparam);
	
	if(rechargeamt == '')
	{
		//alert('Please select amount before clicking on recharge');
		showMessage("Please select amount before clicking on recharge",null,'App','OK');
		return false;
	}else
	{
		//alert('Recharging ');
		showMessage('Recharging ',null,appname,'OK');
		//showMessage("Recharging Wallet ",null,'App','OK');
	}
	//return false;
	//http://localhost/h_app/services/add_wallet/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&amt=100

	//url = serviceURL + 'add_wallet/' + ourclub_id;
	url = serviceURL + 'add_wallet/' + localStorage.session_id_club_id;
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Recharging ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//alert(result.data.balance);
			//showMessage(result.message,null,'App','OK');
			//showMessage("New Balance: " + result.data.balance,null,'App','OK');
			console.log(result.message);
			localStorage.setItem("session_id_balance", result.data.balance);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#search_result_afterlogin_thanks",null, true, true);
			$("#sum_list_afterlogin_thanks").html('');
			$("#sum_list_afterlogin_thanks").append("<li><a href=\"#\">Recharge Done for Rs " + rechargeamt + "</a></li>").listview("refresh");
			$("#sum_list_afterlogin_thanks").append("<li><a href=\"#\">Current Balance: Rs " + result.data.balance + "</a></li>").listview("refresh");

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        	

}

function CheckBalance()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/getbalance/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	//url = serviceURL + 'getbalance/' + ourclub_id;
	url = serviceURL + 'getbalance/' + localStorage.session_id_club_id;
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Checking Balance ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			localStorage.setItem("session_id_balance", result.data.balance);
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

$(document).on('pageinit', '#freetrial', function()
{  
	$(document).on('click', '#submit_free', function(e) 
	{ // catch the form's submit event

		if(e.handled !== true) // This will prevent event triggering more then once
		{		
			//alert('hi2');
			
			  document.getElementById("f_device_platform").value = localStorage.device_platform;
			  document.getElementById("f_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("f_device_browser").value = localStorage.device_browser;

			if($('#regname').val().length > 0 && $('#regemail').val().length > 0 && $('#org').val().length > 0 && $('#f_regcountry').val().length > 0 && $('#tel').val().length > 0 && document.getElementById("f_chk1").checked == true )
			{
				
					//alert($('#freeform').serialize());
					$.ajax({url: serviceURL + 'freesign.php',
						data: $('#freeform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks",null, true, true);
								$("#thanks_list").html('');
								$("#thanks_list").append("<li>" + result.message + "</li>").listview("refresh");;

							} else 
							{
								//alert('Technical error in free trial!'); 
								showMessage('Technical error',null,'Error','OK');
								$.mobile.loading( "hide" );	
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}           		
		
			e.handled = true;
		}
			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#subscribe', function()
{  
	$(document).on('click', '#submit_signup', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("s_device_platform").value = localStorage.device_platform;
			  document.getElementById("s_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("s_device_browser").value = localStorage.device_browser;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#s_regname').val().length > 0 && $('#s_regemail').val().length > 0 && $('#s_add1').val().length > 0 && $('#s_org').val().length > 0 && $('#s_regcountry').val().length > 0 && $('#s_city').val().length > 0  && $('#s_tel').val().length > 0 && document.getElementById("s_chk1").checked == true )
				{
					//alert($('#signup_form').serialize());
					//return false;
					//alert($('#signup_form').serialize());
					$.ajax({url: serviceURL + 'signup.php',
						data: $('#signup_form').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.loading( "hide" );	
								$.mobile.changePage( "#thanks",null, true, true);
								$("#thanks_list").html('');
								$("#thanks_list").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Signup!'); 
								$.mobile.loading( "hide" );	
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

function GetProfile()
{
	//alert('get profile');
	if(localStorage.session_id_local == undefined)
	{
		alert("Please login to access this facility");
		return false;
	}
	session_id = localStorage.session_id_local;
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	//alert(device_id);
	//alert('hhh');
  		$.ajax({url: serviceURL + 'get_profile.php',
		data: {session_id: session_id, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
		type: 'get',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
			$.mobile.loading( 'show', {
				text: 'Getting Profile ...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
				
		},
		complete: function() {
			// This callback function will trigger on data sent/received complete
		   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
			$.mobile.loading( "hide" );
		},
		success: function (result) {
			if(result.status) 
			{
				//localStorage.setItem("session_id_local", result.session_id);
				//$.mobile.changePage("#second");                         
				//alert(result.message);
				//alert(result.message);

				
				//alert(result.S_ID);
				//alert(result.Total);
				//alert(result[0][0].name);
				//alert(result[0].length);
				//alert(localStorage.session_id_local);
				$.mobile.loading( "hide" );	
				
				if(result.Total >0)
				{
					//alert(result[0][0].name)
					$.mobile.changePage( "#profile",null, true, true);
					
					//$('#pr_regcountry').val($('#pr_regcountry option').eq(IN).val());
					$("#pr_regcountry").val(result[0][0].country);
					$("#pr_regcountry").selectmenu('refresh');
					
					document.getElementById("pr_session_id").value = localStorage.session_id_local;
					document.getElementById("pr_device_platform").value = localStorage.device_platform;
					document.getElementById("pr_device_uuid").value = localStorage.device_uuid;
					document.getElementById("pr_device_browser").value = localStorage.device_browser;						
					
					document.getElementById("pr_regname").value = result[0][0].name;						
					document.getElementById("pr_regemail").value = result[0][0].email_id;						
					document.getElementById("pr_org").value = result[0][0].org_name;						
					document.getElementById("pr_add1").value = result[0][0].add1;						
					document.getElementById("pr_add2").value = result[0][0].add2;						
					document.getElementById("pr_city").value = result[0][0].city;						
					document.getElementById("pr_pincode").value = result[0][0].pincode;						
					//document.getElementById("pr_regcountry").selectedIndex  = result[0][0].country;						
					document.getElementById("pr_tel").value = result[0][0].tel;						
					document.getElementById("pr_url").value = result[0][0].url;						
					document.getElementById("pr_product").value = result[0][0].product_services;						
					document.getElementById("pr_operation").value = result[0][0].area_operation;						
					document.getElementById("pr_user_id").value = result[0][0].user_id;						
						
				
				}else
				{
					//alert(result.message);
					showMessage(result.message,null,'Error','OK');
				}
				//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );
				//$.mobile.changePage( "panel.html", { transition: "slideup", changeHash: false });
				//$.mobile.changePage( "main.html",null, true, true);
				//$.mobile.changePage( "#main",null, true, true);
			} else 
			{
				//alert(result.message);
				showMessage(result.message,null,'Error','OK');
				//alert('Logon unsuccessful!'); 
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			//alert('Please check your data connection!');
			$.mobile.loading( "hide" );	
			showMessage('Please check your data connection!',null,'Error','OK');
		}
	});    
}

$(document).on('pageinit', '#profile', function()
{  
	$(document).on('click', '#profile_signup', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("pr_device_platform").value = localStorage.device_platform;
			  document.getElementById("pr_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("pr_device_browser").value = localStorage.device_browser;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#pr_regname').val().length > 0 && $('#pr_regemail').val().length > 0 && $('#pr_add1').val().length > 0 && $('#pr_org').val().length > 0 && $('#pr_regcountry').val().length > 0 && $('#pr_city').val().length > 0  && $('#pr_tel').val().length > 0 )
				{
					//alert($('#profile_form').serialize());
					//return false;
					//alert($('#profile_form').serialize());return false;
					$.ajax({url: serviceURL + 'update_profile.php',
						data: $('#profile_form').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert(result.message);
							//alert(result.total);
							//alert(result.status);
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								
								localStorage.setItem("session_name", $('#pr_regname').val());
								localStorage.setItem("session_org_name", $('#pr_org').val());
								
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert(result.message); 
								showMessage(result.message,null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					$.mobile.loading( "hide" );	
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#contact', function()
{  
	$(document).on('click', '#contact_button', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("c_username").value = localStorage.session_id_username;
			  document.getElementById("c_device_platform").value = localStorage.device_platform;
			  document.getElementById("c_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("c_device_browser").value = localStorage.device_browser;
			  document.getElementById("c_session_id").value = localStorage.session_id_local;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#contname').val().length > 0 && $('#cont_email').val().length > 0 && $('#cont_info').val().length > 0 )
				{
					//alert($('#coform').serialize());
					//return false;
					//alert($('#coform').serialize());
					$.ajax({url: serviceURL + 'contact.php',
						data: $('#coform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Contacting!'); 
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#email_alert', function()
{  
	$(document).on('click', '#email_button', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("e_username").value = localStorage.session_id_username;
			  document.getElementById("e_device_platform").value = localStorage.device_platform;
			  document.getElementById("e_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("e_device_browser").value = localStorage.device_browser;
			  document.getElementById("e_session_id").value = localStorage.session_id_local;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#emlname').val().length > 0 && $('#eml_email').val().length > 0 && $('#eml_days').val().length > 0 )
				{
					//alert($('#emaform').serialize());
					//return false;
					//alert($('#emaform').serialize());
					$.ajax({url: serviceURL + 'emailalert.php',
						data: $('#emaform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Email Alert Request!'); 
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK'); 
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});


function sendID(id)
{
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	session_version= localStorage.session_version;
	user_id = localStorage.session_id_username;

		url = "http://api.bluapps.in/send.php";
		loc_id = localStorage.session_id_club_id;
		if(loc_id == undefined)
		{
			return false;
		}
		
		$.ajax({url: url,
			data: {id: id,  device: localStorage.device_uuid, device_platform: localStorage.device_platform, device_browser: localStorage.device_browser, loc_id: loc_id},
			type: 'post',                   
			async: 'true',
			dataType: 'json',
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				//$.mobile.loading( "show" );
				//alert('1');
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
			   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				//$.mobile.loading( "hide" );
				//alert('2');
			},
			success: function (result) {
				if(result.status) 
				{
					//alert(result.message);
					//alert('3');
				} else 
				{
					//alert(result.message);
					//alert('4');
				}
				//showMessage(result.message, null,'Message','OK');
			},
			error: function (request,error, thrownError) {
				// This callback function will trigger on unsuccessful action                
				//alert('Please check your data connection!' + error);
				//showMessage('Please check your data connection! ' , null,'Error 1 ','OK 1');
				showMessage(request.status + " "  + url, null,'Error 2 ','OK 2');
				//showMessage(request.responseText , null,'Error 4 ','OK 4');
				//showMessage(thrownError , null,'Error 3','OK 3');
			}
		});         			
}

function callback(){}

function showMessage(message, callback, title, buttonName)
{

	title = title || "default title";
	buttonName = buttonName || 'OK';

	//alert(navigator.notification);
	//alert(navigator.notification.alert);
	
	if(navigator.notification == undefined)
	{
		alert(message);
		//callback();
	}else if(navigator.notification && navigator.notification.alert)
	{

		navigator.notification.alert(
			message,    // message
			callback,   // callback
			title,      // title
			buttonName  // buttonName
		);

	}else
	{
		alert(message);
		//callback();
	}
}

function Renew(username)
{
	$.mobile.changePage( "#renewdiaglog", { role: "dialog" } );
	//showMessage('Renewing subscription ' + username ,null,'Error','OK');
	document.getElementById("renew_username").value = localStorage.session_id_username;
	document.getElementById("renew_email_id").value = localStorage.session_id_email_id;
	document.getElementById("renew_name").value = localStorage.session_name;
}

$(document).on('pageinit', '#renewdiaglog', function()
{  
	$(document).on('click', '#renew_login', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');

			 // alert($('#lform').serialize());
			email_id = document.getElementById("renew_email_id").value;
			renew_name = document.getElementById("renew_name").value;
			username = document.getElementById("renew_username").value;
			//alert(name);
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			if($('#renew_email_id').val().length > 0 && $('#renew_name').val().length > 0)
			{
					//alert("test");
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Sending Request  ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
			
					$.ajax({url: serviceURL + 'renew.php',
						data: {username: username, email_id: email_id, name: renew_name, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{

								$.mobile.loading( "hide" );                    
								$("#renewdiaglog").dialog('close');
								//alert(result.message);
								showMessage(result.message,null,'Tendersinfo','OK');
								
							} else 
							{
								$.mobile.loading( "hide" );  
								//alert("ok");
								
								//$('[data-role=dialog]').dialog( "close" );
								$("#renewdiaglog").dialog('close');
								//alert('Logon unsuccessful!'); 
								showMessage(result.message,null,'Tendersinfo','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					//$.fixedToolbars.show();
					//$.mobile.loading( "show" );	
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function ExitApp()
{
	navigator.app.exitApp();
}

function urldecode(str) {
  //       discuss at: http://phpjs.org/functions/urldecode/
  //      original by: Philip Peterson
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      improved by: Lars Fischer
  //      improved by: Orlando
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //         input by: AJ
  //         input by: travc
  //         input by: Brett Zamir (http://brett-zamir.me)
  //         input by: Ratheous
  //         input by: e-mike
  //         input by: lovio
  //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      bugfixed by: Rob
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //             note: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
  //             note: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
  //             note: pages served as UTF-8
  //        example 1: urldecode('Kevin+van+Zonneveld%21');
  //        returns 1: 'Kevin van Zonneveld!'
  //        example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
  //        returns 2: 'http://kevin.vanzonneveld.net/'
  //        example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
  //        returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
  //        example 4: urldecode('%E5%A5%BD%3_4');
  //        returns 4: '\u597d%3_4'

  return decodeURIComponent((str + '')
    .replace(/%(?![\da-f]{2})/gi, function() {
      // PHP tolerates poorly formed escape sequences
      return '%25';
    })
    .replace(/\+/g, '%20'));
}


function BookOne()
{
	var test2 = localStorage.getItem("sess_service_list");
	//alert(test2);
	test = JSON.parse(test2); //var test is now re-loaded!

	//alert(test.length);
	for(j = 0; j<test.length; j++)
	{
		//alert(test[j].service_name);
	}
		
	
	//return false;
	
	
	//alert('hello');
	var b1 = '';
	
	 //$("#data_services option").each(function(i)
	 for(j = 0; j<test.length; j++)
	 {

		//var divided2 = text.split("###");
		var service_id = test[j].service_id;
		var service_name = test[j].service_name;
		var service_logo = test[j].service_logo;
		
		//alert(service_name);
		//alert(service_logo);
		
		b1 += '<div class="book1"><a href="#" onclick=' + '"BookTwo(' + "'" + service_id + "'" + ');">';
		//b1 += '<div class="b1"><img width="40" height="40" src="' + service_logo + '" align="left"></div>';
		//b1 += '<div class="b2">        		<h1 class="btitle">' + service_name + '</h1>       		</div>';
		//b1 += '<div class="b3"> <a href="#" onclick=' + '"BookTwo(' + "'" + service_id + "'" + ');"' + '><input value="BOOK" class="right signin bookbtn" data-role="none" type="submit"></a>';
		
		b1 += '<div class="b1"><img width="40" height="40" src="' + service_logo + '" align="left"></div>';
		b1 += '<div class="b2"> ' + '<h1 class="btitle">' + service_name + '</h1>';		
		b1 += '</div>		</a></div>    		 ';
		b1 += "\n";	
	 }
	 
	//alert(b1);
	$("#booklist").html(b1);
	$.mobile.changePage( "#bookonetest",null, true, true);		
}

function BookOne1_working()
{

	var noofcard = $('#data_services > option').length;
	if(noofcard == 0)
	{
		//$.mobile.loading( 'show', {
		//			text: 'Loading Services ...',
		//			textVisible: true,
		//			theme: 'a',
		//			html: ""
		//		});	
		//$.mobile.loading( "show" );
				
		//setTimeout(function(){
		//	$.mobile.loading( "hide" );
				
		//	//alert('hello');
		//	BookOne();
		//},5000); 
		//alert('calling .......');
		//GetIDDetailsInfo();
		//var noofcard = $('#data_idcard > option').length;
	}
	
	//alert('hello');
	var b1 = '';
	
	 $("#data_services option").each(function(i)
	 {
		val = $(this).val();
		text = $(this).text();
        //alert(text + " : " + val);
		if(val.length >0)
		{
			var divided2 = text.split("###");
			var service_id = divided2[0];
			var service_name = divided2[1];
			var service_logo = divided2[2];
			var name4 = divided2[3];
			var name5 = divided2[4];		
			
			//alert(service_name);
			//alert(service_logo);
			
			b1 += '<div class="book1">';
			b1 += '<div class="b1"><img width="40" height="40" src="' + service_logo + '" align="left"></div>';
			b1 += '<div class="b2">        		<h1 class="btitle">' + service_name + '</h1>       		</div>';
			b1 += '<div class="b3"> <a href="#" onclick=' + '"BookTwo(' + "'" + service_id + "'" + ');"' + '><input value="BOOK" class="right signin bookbtn" data-role="none" type="submit"></a>';
			b1 += '</div>		</div>    		 ';
			b1 += "\n";	
		}
     });
	 
	//alert(b1);
	$("#booklist").html(b1);
	$.mobile.changePage( "#bookonetest",null, true, true);		
}

function BookOne1()
{
	var b1 = '';
//http://localhost/h_app/services_v2/list_services/1?session=HA0ea127f361eb356be099474bc8b54255be48e6e1
	//alert('hello');
	session_id = localStorage.getItem("session_id_local");
	//alert(session_id);
	
		//url = serviceURL + 'list_services/' + ourclub_id;
		url = serviceURL + 'list_services/' + localStorage.session_id_club_id;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {session: session_id},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							//alert('d');
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert('e');
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.message);
								//alert(result.timing);
								//alert(result.club_name);
					
							//alert(Object.keys(result.data.service).length);
							//alert('aaa');
							
							for(i2=0; i2<Object.keys(result.data.service).length; i2++)
							{
								//alert(result.data[i2].building_name);
								//alert(result.data[i2].wings);
								service_id = result.data.service[i2].service_id;
								service_name = result.data.service[i2].service_name;
								service_logo = result.data.service[i2].service_logo;
								game_rule = result.data.service[i2].game_rule;
								comments = result.data.service[i2].comments;
								//alert(service_name);
								
								
								b1 += '<div class="book1">';
								b1 += '<div class="b1"><img width="40" height="40" src="' + service_logo + '" align="left"></div>';
								b1 += '<div class="b2">        		<h1 class="btitle">' + service_name + '</h1>       		</div>';
								b1 += '<div class="b3"> <a href="#" onclick=' + '"BookTwo(' + "'" + service_id + "'" + ');"' + '><input value="BOOK" class="right signin bookbtn" data-role="none" type="submit"></a>';
								b1 += '</div>		</div>    		 ';
								b1 += "\n";
								
								
							}
							//alert(b1);

							$("#booklist").html(b1);
							$.mobile.changePage( "#bookonetest",null, true, true);


								//showMessage(result.message,null,'Welcome','OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								//showMessage(result.message,null,result.message,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							//showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
					
		//alert(b1);
		//$("#booklist").html(b1);
	//$.mobile.changePage( "#bookonetest",null, true, true);
		
}

function BookTwo(service_id)
{
	$('#slot_no').empty();
	
		$.mobile.loading( 'show', {
		text: 'Loading Services ...',
		textVisible: true,
		theme: 'a',
		html: ""
	});	
	
	//alert(service_id);//return false;
	
		var test2 = localStorage.getItem("sess_member_list");
		//alert(test2);
		test = JSON.parse(test2); //var test is now re-loaded!	
		var noofcard = test.length;
		//alert(test);

		//alert(noofcard);

		var name = '';
		
		$('#cash_cardno2').empty();
		$('#cash_cardno2').append( new Option('Select Card *', '') );
					
		first =0;
		myval =  '';
		for(j = 0; j<test.length; j++)
		{
			first = first +1;
			
			member_id = test[j].member_id;						
			membership_id = urldecode(test[j].membership_id);
			mydata = test[j].member_id + '###'+ urldecode(test[j].membership_id);
			//alert(mydata);
			if(first == 1)
			{
				myval = mydata;
			}
			
			$('#cash_cardno2').append( new Option(urldecode(test[j].name) + ' (' + urldecode(test[j].membership_id) + ')', mydata) );	
			//alert(member_id + ' - ' + name);
			//$( "#cash_cardno2" ).change();
		}
		
		$(function() {
		$("#cash_cardno2").val(myval).change();
		});
		//$('#cash_cardno2 option[value=""]').attr("selected", "selected");
		//$("#cash_cardno2").val(myval);
		//$('select[name=cash_cardno2] option:eq(myval)').attr('selected', 'selected');
	
	$("service_id").val(service_id);
	var b1 = '';
//http://localhost/h_app/services_v2/service_prop/1?service_id=1&session=HA9387aa0eaa4f75f2fbfcfd987bafdeb9e5032274
	//alert('hello');
	session_id = localStorage.getItem("session_id_local");
	//alert(session_id);
	
		//url = serviceURL + 'service_prop/' + ourclub_id;
		url = serviceURL + 'service_prop/' + localStorage.session_id_club_id;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {session: session_id, service_id: service_id},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							//alert('d');
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert('e');
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.message);
								//alert(result.timing);
								//alert(result.club_name);
					
							//alert(Object.keys(result.data.service).length);
							//alert('aaa');
							var charges2 = '';
							var guest_charges2 = '';
							for(i2=0; i2<Object.keys(result.data.service).length; i2++)
							{
								//alert(result.data[i2].building_name);
								//alert(result.data[i2].wings);
								service_id = result.data.service[i2].service_id;
								service_name = result.data.service[i2].service_name;
								service_logo = result.data.service[i2].service_logo;
								charges = result.data.service[i2].charges;
								guest_charges = result.data.service[i2].guest_charges;
								game_rule = urldecode(result.data.service[i2].game_rule);
								comments = urldecode(result.data.service[i2].comments);
								max_member = result.data.service[i2].max_member;
								bookwithoutslot = result.data.service[i2].bookwithoutslot;
								booking_allowed = result.data.service[i2].booking_allowed;
								booking_logic = result.data.service[i2].booking_logic;
								tax_code = result.data.service[i2].tax_code;
								Tax_rate = result.data.service[i2].Tax_rate;
								timing = urldecode(result.data.service[i2].timing);
								//game_rule = result.data.service[i2].game_rule;
								//comments = result.data.service[i2].comments;
								//alert(game_rule);
								//alert(tax_code);
								
								b1 += '<div class="book1">';
								b1 += '<div class="b1"><img width="40" height="40" src="' + service_logo + '" align="left"></div>';
								b1 += '<div class="b2">        		<h1 class="btitle">' + service_name + '</h1>       		</div>';
								b1 += '<div class="b3"> <a href="#booktwo"><input value="BOOK" class="right signin bookbtn" data-role="none" type="submit"></a>';
								b1 += '</div>		</div>    		 ';
								b1 += "\n";
								
								charges2 = charges2 + " - " + charges;
								guest_charges2 = guest_charges2 + " - " + guest_charges;
																
							}
							charges2 = charges2.substring(2, 400);
							guest_charges2 = guest_charges2.substring(2, 400);
							
							if(Object.keys(result.data.service).length >1)
							{
								//alert('having multiple price');
								//alert(charges2);
							}
							
							var service_logo1 = '<img width="70" height="70" src="' + service_logo + '" align="left">';
							$("#service_name").html(service_name);
							$("#service_name2").html(service_name);
							$("#service_logo").html(service_logo1);
							$("#comments_2").html(comments);
							$("#game_rule").html(game_rule);
							$("#timing1").html(timing);
							$("#timing2").html(timing);
							$("#max_member").val(max_member);
							$("#booking_logic").val(booking_logic);
							$("#bookwithoutslot").val(bookwithoutslot);
							$("#tax_code").val(tax_code);
							$("#Tax_rate").val(Tax_rate);
							$("#m_charge").val(charges);
							$("#g_charge").val(guest_charges);
							$("#service_id").val(service_id);
							
							$("#m_charge_lbl").html(charges2);
							$("#g_charge_lbl").html(guest_charges2);
							$("#m_charge_lbl2").html(charges2);
							$("#g_charge_lbl2").html(guest_charges2);
								
							if(booking_allowed == 0)
							{
								if(Object.keys(result.data.dodservices).length == 0)
								{
									//alert(result.message);
									showMessage(result.message,null,'Error','OK');
									return false;
								}
							}							
							wing = '1';
							
							if(max_member <= 0 || max_member>5 )
							{
								max_member = 5;
							}
							
							$('#no_of_member').empty();
							//alert('empty member');
							$('#no_of_member').append( new Option('Select Member/Cardholder *', '') );	

							$('#no_of_guest').empty();
							$('#no_of_guest').append( new Option('Select Guest *', '') );	
							$('#no_of_guest').append( new Option('No Guest',0) );
							
							//alert(max_member);
							for(mm1=1; mm1<=max_member; mm1++)
							{
								$('#no_of_member').append( new Option(mm1,mm1) );
								$('#no_of_guest').append( new Option(mm1,mm1) );
							}		
							//alert('inside add member');
			

							$('#no_of_member option').each(function(){ 
									   if($(this).text() == 'Select Member/Cardholder *') 
											this.disabled=true;
							}); 
							$('#no_of_guest option').each(function(){ 
									   if($(this).text() == 'Select Guest *') 
											this.disabled=true;
							}); 	
							//$("#no_of_member")[0].selectedIndex = 0;	
							//$("#no_of_guest")[1].selectedIndex = 0;	
							//$("#no_of_guest").attr('selectedIndex', 1);
							//$("#no_of_guest").get(0).selectedIndex = 1;
							$("#no_of_member").val("1").change();
							$("#no_of_guest").val("0").change();
							
							
							//alert(Object.keys(result.data.dodservices).length);
							if(Object.keys(result.data.dodservices).length == 0)
							{
								$("#show_dod_no").hide();
								$('#dod').empty();
							}else
							{
								$('#dod').empty();

								$('#dod').append( new Option('Select Date *', '') );
								
								for(i5=0; i5<Object.keys(result.data.dodservices).length; i5++)
								{
										//alert(result.data[i2].building_name);
										//alert(result.data[i2].wings);
										date_b = result.data.dodservices[i5].date_b;
										date_name = result.data.dodservices[i5].date_name;
										$('#dod').append( new Option(date_name,date_b) );
								}
								
								$('#dod option').each(function(){ 
									   if($(this).text() == 'Select Date *') 
											this.disabled=true;
								}); 
								$("#show_dod_no").show();
								$("#dod")[0].selectedIndex = 0;	
								//$("#dod").val("2016-05-06").change();
								$('select[name=dod] option:eq(1)').attr('selected', 'selected');
								$("#dod").change();
								//$('select[name=cash_cardno2] option:eq(1)').attr('selected', 'selected');
								$//("#cash_cardno2").change();								
								//$("#dod").trigger('onchange');
								//<strong>Date: </strong>30-Apr-2016<br/>
								//<strong>Court: </strong>Court 1<br/>
								
							}
							//$("#dod").val("0").change();
							//alert('court ' + Object.keys(result.data.court).length);
							//alert('slots ' + Object.keys(result.data.slots).length);
							if(Object.keys(result.data.court).length == 0)
							{
								$("#show_court_no").hide();
								$('#court_no').empty();
							}else
							{
								$('#court_no').empty();
								known_as = result.data.court[0].known_as;

								if(known_as.length == 0)
								{
									known_as = 'Court';
								}
								$("#known_as_txt").val(known_as);
								$('#court_no').append( new Option('Select ' + known_as + '*', '') );
								
								if(bookwithoutslot == 'Y')
								{
									$('#court_no').append( new Option('Any ' + known_as + '', '0') );
								}
								var defcourt = '';
								for(i3=0; i3<Object.keys(result.data.court).length; i3++)
								{
										//alert(result.data[i2].building_name);
										//alert(result.data[i2].wings);
										court_id = result.data.court[i3].court_id;
										court_name = result.data.court[i3].court_name;
										$('#court_no').append( new Option(court_name,court_id) );
										if(defcourt.length == 0)
										{
											defcourt = court_id;
										}
								}
								
								$('#court_no option').each(function(){ 
									   if($(this).text() == 'Select ' + known_as + '*') 
											this.disabled=true;
								}); 
								$("#show_court_no").show();
								
								if(bookwithoutslot == 'Y')
								{
									//$("#court_no")[1].selectedIndex = 1;	
								}else
								{
									//$("#court_no")[0].selectedIndex = 0;	
									$("#court_no").find('option').each(function( i, opt ) 
									{
										//alert('a');
									    if( opt.value == defcourt ) 
									        $(opt).attr('selected', 'selected');
									});
								}


								//<strong>Date: </strong>30-Apr-2016<br/>
								//<strong>Court: </strong>Court 1<br/>
								
							}
							//$("#court_no").val("0").change();
							
							//$('#court_no').val('30').attr('selected', true);
							//$('#court_no').val('Emerald Club').prop('selected', true);
							//$("#court_no option[value='30']").attr('selected', true);

							$("#court_no").change();
							//alert('ha');

							$('#datenochange').val('1');
							
							if(Object.keys(result.data.slots).length == 0)
							{
								$("#show_slot_no").hide();
								//$('#slot_no2').empty();
								$('#slot_no').empty();
							}else
							{
								$("#show_slot_no").show();
								//$('#slot_no2').empty();
								$('#slot_no').empty();
								$('#slot_no').append( new Option('Select Timing *', '') );
								
								for(i4=0; i4<Object.keys(result.data.slots).length; i4++)
								{
										//alert(result.data[i2].building_name);
										//alert(result.data[i2].wings);
										//court_id = result.data.slots[i4].court_id;
										//timesl_id = result.data.slots[i4].timesl_id;
										//timing = result.data.slots[i4].timing;
										//$('#slot_no2').append( new Option(court_id + '###' + timesl_id + '###' + timing,court_id + '###' + timesl_id + '###' + timing) );
										mem_charge2 = result.data.slots[i4].mem_charge;
										gue_charge2 = result.data.slots[i4].gue_charge;
										timing2 = result.data.slots[i4].timing;
										timing2_2 = mem_charge2 + '###' + gue_charge2 + '###' + timing2;
										//alert(timing2_2);
										//timesl_id = result.data.slots[i4].timesl_id;
										//timing = result.data.slots[i4].timing;
										//alert(timing);
										$('#slot_no').append( new Option(timing2, timing2_2) );										
								}
								//$("#slot_no2")[0].selectedIndex = 0;	
								//$("#slot_no")[0].selectedIndex = 0;	
								//alert(timing2);								
								// document.getElementById('dod').onchange = ""; 
								$('#datenochange').val('1');
								//$('#slot_no').refresh();
								//$('#slot_no').select2().trigger('change');
							}
							
							//$("#court_no")[0].selectedIndex = 0;	
							//$("#slot_no")[0].selectedIndex = 0;
							$("#slot_no").change();	
							//$("#court_no").val("Select Court *").change();
							//$("#slot_no").val("Select Timing *").change();							
							//alert(b1);
							
							
							//$("#booklist").html(b1);
							$.mobile.changePage( "#booktwotest",null, true, true);


								//showMessage(result.message,null,'Welcome','OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,result.message,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
					$('#datenochange').val('0');
		//alert(b1);
		//$("#booklist").html(b1);
	//$.mobile.changePage( "#bookonetest",null, true, true);
	//document.getElementById('dod').onchange = "d_change();"; 
	
}

function BookTwo_Date(service_id, date_refresh)
{
	$('#slot_no').empty();
	
	$.mobile.loading( 'show', {
		text: 'loading ...',
		textVisible: true,
		theme: 'a',
		html: ""
	});	
	
		var test2 = localStorage.getItem("sess_member_list");
		//alert(test2);
		test = JSON.parse(test2); //var test is now re-loaded!	
		var noofcard = test.length;
		//alert(test);

		//alert(noofcard);

		var name = '';
		
		$('#cash_cardno2').empty();
		$('#cash_cardno2').append( new Option('Select Card *', '') );
					
		first =0;
		myval =  '';
		for(j = 0; j<test.length; j++)
		{
			first = first +1;
			
			member_id = test[j].member_id;						
			membership_id = urldecode(test[j].membership_id);
			mydata = test[j].member_id + '###'+ urldecode(test[j].membership_id);
			//alert(mydata);
			if(first == 1)
			{
				myval = mydata;
			}
			
			$('#cash_cardno2').append( new Option(urldecode(test[j].name) + ' (' + urldecode(test[j].membership_id) + ')', mydata) );	
			//alert(member_id + ' - ' + name);
			//$( "#cash_cardno2" ).change();
		}
		
		$(function() {
		$("#cash_cardno2").val(myval).change();
		});
		
	var b1 = '';
	//alert(service_id);return false;
//http://localhost/h_app/services_v2/service_prop/1?service_id=1&session=HA9387aa0eaa4f75f2fbfcfd987bafdeb9e5032274
	//alert('hello');
	session_id = localStorage.getItem("session_id_local");
	//alert(session_id);
	
		//url = serviceURL + 'service_prop/' + ourclub_id;
		url = serviceURL + 'service_prop/' + localStorage.session_id_club_id;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {session: session_id, service_id: service_id, dod: date_refresh},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							//alert('d');
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert('e');
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.message);
								//alert(result.timing);
								//alert(result.club_name);
					
							//alert(Object.keys(result.data.service).length);
							//alert('aaa');
							
							var charges2 = '';
							var guest_charges2 = '';
							for(i2=0; i2<Object.keys(result.data.service).length; i2++)
							{
								//alert(result.data[i2].building_name);
								//alert(result.data[i2].wings);
								service_id = result.data.service[i2].service_id;
								service_name = result.data.service[i2].service_name;
								service_logo = result.data.service[i2].service_logo;
								charges = result.data.service[i2].charges;
								guest_charges = result.data.service[i2].guest_charges;
								game_rule = urldecode(result.data.service[i2].game_rule);
								comments = urldecode(result.data.service[i2].comments);
								max_member = result.data.service[i2].max_member;
								booking_logic = result.data.service[i2].booking_logic;
								tax_code = result.data.service[i2].tax_code;
								Tax_rate = result.data.service[i2].Tax_rate;
								timing = urldecode(result.data.service[i2].timing);
								//game_rule = result.data.service[i2].game_rule;
								//comments = result.data.service[i2].comments;
								//alert(game_rule);
								//alert(tax_code);
								
								b1 += '<div class="book1">';
								b1 += '<div class="b1"><img width="40" height="40" src="' + service_logo + '" align="left"></div>';
								b1 += '<div class="b2">        		<h1 class="btitle">' + service_name + '</h1>       		</div>';
								b1 += '<div class="b3"> <a href="#booktwo"><input value="BOOK" class="right signin bookbtn" data-role="none" type="submit"></a>';
								b1 += '</div>		</div>    		 ';
								b1 += "\n";
								
								charges2 = charges2 + " - " + charges;
								guest_charges2 = guest_charges2 + " - " + guest_charges;
							}
							wing = '1';

							charges2 = charges2.substring(2, 400);
							guest_charges2 = guest_charges2.substring(2, 400);
							
							if(Object.keys(result.data.service).length >1)
							{
								//alert('having multiple price');
								//alert(charges2);
							}							
							
								var service_logo1 = '<img width="70" height="70" src="' + service_logo + '" align="left">';
								$("#service_name").html(service_name);
								$("#service_name2").html(service_name);
								$("#service_logo").html(service_logo1);
								$("#game_rule").html(game_rule);
								$("#timing1").html(timing);
								$("#timing2").html(timing);
								$("#tax_code").val(tax_code);
								$("#Tax_rate").val(Tax_rate);
								$("#m_charge").val(charges);
								$("#g_charge").val(guest_charges);
								$("#service_id").val(service_id);
								
								$("#m_charge_lbl").html(charges2);
								$("#g_charge_lbl").html(guest_charges2);
								$("#m_charge_lbl2").html(charges2);
								$("#g_charge_lbl2").html(guest_charges2);
								
							if(max_member <= 0 || max_member>5 )
							{
								max_member = 5;
							}
							
							//$('#no_of_member').empty();
							//alert('empty member');
							//$('#no_of_member').append( new Option('Select Member/Cardholder *', '') );	

							//$('#no_of_guest').empty();
							//$('#no_of_guest').append( new Option('Select Guest *', '') );	
							//$('#no_of_guest').append( new Option('No Guest',0) );
							
							//alert(max_member);
							//for(mm1=1; mm1<=max_member; mm1++)
							//{
							//	$('#no_of_member').append( new Option(mm1,mm1) );
							//	$('#no_of_guest').append( new Option(mm1,mm1) );
							//}		
							//alert('inside add member');
			

							//$('#no_of_member option').each(function(){ 
							//		   if($(this).text() == 'Select Member/Cardholder *') 
							//				this.disabled=true;
							//}); 
							//$('#no_of_guest option').each(function(){ 
							//		   if($(this).text() == 'Select Guest *') 
							//				this.disabled=true;
							//}); 	
							//$("#no_of_member")[0].selectedIndex = 0;	
							//$("#no_of_guest")[1].selectedIndex = 0;	
							//$("#no_of_guest").attr('selectedIndex', 1);
							//$("#no_of_guest").get(0).selectedIndex = 1;
							//$("#no_of_member").val("1").change();
							//$("#no_of_guest").val("0").change();
							
							
							//alert(Object.keys(result.data.dodservices).length);
							//if(Object.keys(result.data.dodservices).length == 0)
							//{
							//	$("#show_dod_no").hide();
							//	$('#dod').empty();
							//}else
							//{
							//	$('#dod').empty();

							//	$('#dod').append( new Option('Select Date *', '') );
								
							//	for(i5=0; i5<Object.keys(result.data.dodservices).length; i5++)
							//	{
										//alert(result.data[i2].building_name);
										//alert(result.data[i2].wings);
							//			date_b = result.data.dodservices[i5].date_b;
							//			date_name = result.data.dodservices[i5].date_name;
							//			$('#dod').append( new Option(date_name,date_b) );
							//	}
								
							//	$('#dod option').each(function(){ 
							//		   if($(this).text() == 'Select Date *') 
							//				this.disabled=true;
							//	}); 
							//	$("#show_dod_no").show();
							//	$("#dod")[0].selectedIndex = 0;	
								//<strong>Date: </strong>30-Apr-2016<br/>
								//<strong>Court: </strong>Court 1<br/>
								
							//}
							//$("#dod").val("0").change();
							//alert('court ' + Object.keys(result.data.court).length);
							//alert('slots ' + Object.keys(result.data.slots).length);
							if(Object.keys(result.data.court).length == 0)
							{
								$("#show_court_no").hide();
								$('#court_no').empty();
							}else
							{
								$('#court_no').empty();
								known_as = result.data.court[0].known_as;
								if(known_as.length == 0)
								{
									known_as = 'Court';
								}
								$("#known_as_txt").val(known_as);

								$('#court_no').append( new Option('Select ' + known_as + '*', '') );

								//if(bookwithoutslot == 'Y')
								//{
									$('#court_no').append( new Option('Any ' + known_as + '', '0') );
								//}								
								for(i3=0; i3<Object.keys(result.data.court).length; i3++)
								{
										//alert(result.data[i2].building_name);
										//alert(result.data[i2].wings);
										court_id = result.data.court[i3].court_id;
										court_name = result.data.court[i3].court_name;
										$('#court_no').append( new Option(court_name,court_id) );
								}
								
								$('#court_no option').each(function(){ 
									   if($(this).text() == 'Select ' + known_as + '*') 
											this.disabled=true;
								}); 
								$("#show_court_no").show();
								$("#court_no")[0].selectedIndex = 0;	


								//<strong>Date: </strong>30-Apr-2016<br/>
								//<strong>Court: </strong>Court 1<br/>
								
							}
							$("#court_no").val("0").change();

							if(Object.keys(result.data.slots).length == 0)
							{
								$("#show_slot_no").hide();
								//$('#slot_no2').empty();
								$('#slot_no').empty();
							}else
							{
								$("#show_slot_no").show();
								//$('#slot_no2').empty();
								$('#slot_no').empty();
								$('#slot_no').append( new Option('Select Timing *', '') );
								for(i4=0; i4<Object.keys(result.data.slots).length; i4++)
								{
										//alert(result.data[i2].building_name);
										//alert(result.data[i2].wings);
										//court_id = result.data.slots[i4].court_id;
										//timesl_id = result.data.slots[i4].timesl_id;
										//timing = result.data.slots[i4].timing;
										//$('#slot_no2').append( new Option(court_id + '###' + timesl_id + '###' + timing,court_id + '###' + timesl_id + '###' + timing) );
										mem_charge2 = result.data.slots[i4].mem_charge;
										gue_charge2 = result.data.slots[i4].gue_charge;
										timing2 = result.data.slots[i4].timing;
										timing2_2 = mem_charge2 + '###' + gue_charge2 + '###' + timing2;
										//alert(timing2_2);
										//timesl_id = result.data.slots[i4].timesl_id;
										//timing = result.data.slots[i4].timing;
										//alert(timing);
										$('#slot_no').append( new Option(timing2, timing2_2) );										
								}
								//$("#slot_no2")[0].selectedIndex = 0;	
								//$("#slot_no")[0].selectedIndex = 0;	
								//$('#slot_no').refresh();
								//$('#slot_no').select2().trigger('change');
								//alert(timing2);								
								
							}							

							//$("#court_no")[0].selectedIndex = 0;	
							//$("#slot_no")[0].selectedIndex = 0;	
							$('#slot_no').change();
							//$("#court_no").val("Select Court *").change();
							//$("#slot_no").val("Select Timing *").change();							
							//alert(b1);

							//$("#booklist").html(b1);
							$.mobile.changePage( "#booktwotest",null, true, true);


								//showMessage(result.message,null,'Welcome','OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,result.message,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
					
		//alert(b1);
		//$("#booklist").html(b1);
	//$.mobile.changePage( "#bookonetest",null, true, true);
		
}

function BookTwo_Date_Court(service_id, date_refresh, court_refresh)
{
	$('#slot_no').empty();
	
	$.mobile.loading( 'show', {
		text: 'loading ...',
		textVisible: true,
		theme: 'a',
		html: ""
	});	
	
		var test2 = localStorage.getItem("sess_member_list");
		//alert(test2);
		test = JSON.parse(test2); //var test is now re-loaded!	
		var noofcard = test.length;
		//alert(test);

		//alert(noofcard);

		var name = '';
		
		$('#cash_cardno2').empty();
		$('#cash_cardno2').append( new Option('Select Card *', '') );
					
		first =0;
		myval =  '';
		for(j = 0; j<test.length; j++)
		{
			first = first +1;
			
			member_id = test[j].member_id;						
			membership_id = urldecode(test[j].membership_id);
			mydata = test[j].member_id + '###'+ urldecode(test[j].membership_id);
			//alert(mydata);
			if(first == 1)
			{
				myval = mydata;
			}
			
			$('#cash_cardno2').append( new Option(urldecode(test[j].name) + ' (' + urldecode(test[j].membership_id) + ')', mydata) );	
			//alert(member_id + ' - ' + name);
			//$( "#cash_cardno2" ).change();
		}
		
		$(function() {
		$("#cash_cardno2").val(myval).change();
		});
		
	var b1 = '';
	//alert(service_id);return false;
//http://localhost/h_app/services_v2/service_prop/1?service_id=1&session=HA9387aa0eaa4f75f2fbfcfd987bafdeb9e5032274
	//alert('hello');
	session_id = localStorage.getItem("session_id_local");
	//alert(session_id);
	
		//url = serviceURL + 'service_prop/' + ourclub_id;
		url = serviceURL + 'service_prop/' + localStorage.session_id_club_id;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {session: session_id, service_id: service_id, dod: date_refresh, court_no: court_refresh},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							//alert('d');
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert('e');
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.message);
								//alert(result.timing);
								//alert(result.club_name);
					
							//alert(Object.keys(result.data.service).length);
							//alert('aaa');
							
							for(i2=0; i2<Object.keys(result.data.service).length; i2++)
							{
								//alert(result.data[i2].building_name);
								//alert(result.data[i2].wings);
								service_id = result.data.service[i2].service_id;
								service_name = result.data.service[i2].service_name;
								service_logo = result.data.service[i2].service_logo;
								charges = result.data.service[i2].charges;
								guest_charges = result.data.service[i2].guest_charges;
								game_rule = urldecode(result.data.service[i2].game_rule);
								comments = urldecode(result.data.service[i2].comments);
								max_member = result.data.service[i2].max_member;
								booking_logic = result.data.service[i2].booking_logic;
								tax_code = result.data.service[i2].tax_code;
								Tax_rate = result.data.service[i2].Tax_rate;
								timing = urldecode(result.data.service[i2].timing);
								//game_rule = result.data.service[i2].game_rule;
								//comments = result.data.service[i2].comments;
								//alert(game_rule);
								//alert(tax_code);
								
								b1 += '<div class="book1">';
								b1 += '<div class="b1"><img width="40" height="40" src="' + service_logo + '" align="left"></div>';
								b1 += '<div class="b2">        		<h1 class="btitle">' + service_name + '</h1>       		</div>';
								b1 += '<div class="b3"> <a href="#booktwo"><input value="BOOK" class="right signin bookbtn" data-role="none" type="submit"></a>';
								b1 += '</div>		</div>    		 ';
								b1 += "\n";
								
								var service_logo1 = '<img width="70" height="70" src="' + service_logo + '" align="left">';
								$("#service_name").html(service_name);
								$("#service_name2").html(service_name);
								$("#service_logo").html(service_logo1);
								$("#game_rule").html(game_rule);
								$("#timing1").html(timing);
								$("#timing2").html(timing);
								$("#tax_code").val(tax_code);
								$("#Tax_rate").val(Tax_rate);
								$("#m_charge").val(charges);
								$("#g_charge").val(guest_charges);
								$("#service_id").val(service_id);
								
								$("#m_charge_lbl").html(charges);
								$("#g_charge_lbl").html(guest_charges);
								$("#m_charge_lbl2").html(charges);
								$("#g_charge_lbl2").html(guest_charges);
																
							}
							wing = '1';
							
							if(max_member <= 0 || max_member>5 )
							{
								max_member = 5;
							}
							

							
							//alert(Object.keys(result.data.dodservices).length);
							
							if(Object.keys(result.data.slots).length == 0)
							{
								//alert('Slot not available for Booking');
								showMessage('Slot not available for Booking',null,'Blu','OK');
								$("#show_slot_no").hide();
								//$('#slot_no2').empty();
								$('#slot_no').empty();
							}else
							{
								$("#show_slot_no").show();
								//$('#slot_no2').empty();
								$('#slot_no').empty();
								$('#slot_no').append( new Option('Select Timing *', '') );
								for(i4=0; i4<Object.keys(result.data.slots).length; i4++)
								{
										//alert(result.data[i2].building_name);
										//alert(result.data[i2].wings);
										//court_id = result.data.slots[i4].court_id;
										//timesl_id = result.data.slots[i4].timesl_id;
										//timing = result.data.slots[i4].timing;
										//$('#slot_no2').append( new Option(court_id + '###' + timesl_id + '###' + timing,court_id + '###' + timesl_id + '###' + timing) );
										mem_charge2 = result.data.slots[i4].mem_charge;
										gue_charge2 = result.data.slots[i4].gue_charge;
										timing2 = result.data.slots[i4].timing;
										timing2_2 = mem_charge2 + '###' + gue_charge2 + '###' + timing2;
										//alert(timing2_2);
										//timesl_id = result.data.slots[i4].timesl_id;
										//timing = result.data.slots[i4].timing;
										//alert(timing);
										$('#slot_no').append( new Option(timing2, timing2_2) );										
								}
								//$("#slot_no2")[0].selectedIndex = 0;	
								//$("#slot_no")[0].selectedIndex = 0;	
								//$('#slot_no').refresh();
								//$('#slot_no').select2().trigger('change');
								//alert(timing2);								
								
							}							

							//$("#court_no")[0].selectedIndex = 0;	
							//$("#slot_no")[0].selectedIndex = 0;	
							$("#slot_no").change();	

							//$("#court_no").val("Select Court *").change();
							//$("#slot_no").val("Select Timing *").change();							
							//alert(b1);

							//$("#booklist").html(b1);
							$.mobile.changePage( "#booktwotest",null, true, true);


								//showMessage(result.message,null,'Welcome','OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,result.message,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
					
		//alert(b1);
		//$("#booklist").html(b1);
	//$.mobile.changePage( "#bookonetest",null, true, true);
		
}	

function m_change()
{
	m_charge = $("#m_charge").val();
	no_of_member = $("#no_of_member").val();
	g_charge = $("#g_charge").val();
	no_of_guest = $("#no_of_guest").val();
	tax_code = $("#tax_code").val();
	Tax_rate = $("#Tax_rate").val();
	total_charge = (m_charge * no_of_member) + (g_charge * no_of_guest);
	
	var tax =0;
	if(tax_code == '1')//taxable
	{
		tax = ((total_charge * Tax_rate)/100);
		//tax =  Math.round10(tax, -2);
		//alert(tax);
	}
			
	$("#total_charge").val(total_charge + tax );
	$("#t_charge_lbl2").html(total_charge + tax);
	
}

 function c_change()
 {	
	court_no = $("#court_no").val();
	$('#slot_no').empty();
	$('#slot_no').append( new Option('Select Timing *', '') );	
	
	//alert('hi ' + court_no);

	$('#slot_no2 option').each(function(index,element)
	{
	 console.log(index);
	 console.log(element.value);
	 //console.log(element.text);
	
	 var divided2 = element.value.split("###");
	 var court_id = divided2[0];
	 var timesl_id = divided2[1];
	 var timing = divided2[2];
	 
	 //alert(element.value);
	 //alert(court_id + ' * ' + timesl_id + ' * ' + timing);
	 //return false;
	 
	 if(index >0)
	 {
		 if(court_no == court_id) // same court
		 {
			$('#slot_no').append( new Option(timing, timesl_id) );
			
		 }
		 //alert(name3);
		 //alert(element.text);
		 
		
		 //return false;
	 }
			$('#slot_no option').each(function(){ 
			   if($(this).text() == 'Select Timing *') 
					this.disabled=true;
			});
			
			
	 });	
	$("#slot_no")[0].selectedIndex = 0;	
	
 }

 function court_change()
 {
	service_id = $("#service_id").val();
	court_no = $("#court_no").val();
	dod = $("#dod").val();
	//$('#dod').empty();
	//$('#dod').append( new Option('Select Date *', '') );	
	selected_court = $("#court_no :selected").text();
	//alert(court_no);
	$("#selected_court").val(selected_court);
	$("#selected_court_no").val(court_no);
	if(dod == null)
		return false;
	
	//alert('2 hi ' + dod);
	//service_id = $("#service_id").val();
	//if(court_no != '0')
	//{
		BookTwo_Date_Court(service_id, dod, court_no);
	//}
	return false;
 }
 
 function d_change()
 {
	
	dod = $("#dod").val();
	datenochange = $('#datenochange').val();
	
	//$('#dod').empty();
	//$('#dod').append( new Option('Select Date *', '') );	
	
	//alert('1 hi  ' + datenochange + ' * ' + dod);
	
	if(datenochange == '1')
	{
		service_id = $("#service_id").val();
		
		BookTwo_Date(service_id, dod);
	}
	
	return false;
 }

 
$(document).on('pageinit', '#booktwotest', function()
{  
	service_id = $("#service_id").val();
	dod = $("#dod").val();
	//alert('aaa');
	$(document).on('click', '#book2btn', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked book3');
			//alert(localStorage.device_uuid);

			 // alert($('#lform').serialize());
			no_of_member = $("#no_of_member").val();
			no_of_guest = $("#no_of_guest").val();			
			cash_cardno2 = $("#cash_cardno2").val();
			court_no = $("#court_no").val();
			booking_logic = $("#booking_logic").val();
			slot_no = $("#slot_no").val();
			tax_code = $("#tax_code").val();
			Tax_rate = $("#Tax_rate").val();

			var test2 = localStorage.getItem("sess_member_list");
			//alert(test2);
			test = JSON.parse(test2); //var test is now re-loaded!	
			var noofcard = test.length;
			//alert(test);

			var name = '';
			var card_no3_tmp = cash_cardno2.split("#");
			var cash_cardno3 = card_no3_tmp[0];
			var balance = 0;
			for(j = 0; j<test.length; j++)
			{
				
				member_id = test[j].member_id;	
				//balance = test[j].balance;	
				//alert('balance ' + balance + ' cash_cardno3 ' + cash_cardno3 + ' member_id ' + member_id);
				if(cash_cardno3 == member_id)
				{
					balance = test[j].balance;	
					//alert('balance 1 ' + balance + ' ');
				}
			}

			//alert(cash_cardno2);return false;
			//alert('balance 2 ' + balance + ' ');

			//member = $("#no_of_member").val();
			//guest = $("#no_of_guest").val();
			max_member = $("#max_member").val();
			bookwithoutslot = $("#bookwithoutslot").val();
			
			tmember = parseInt(no_of_member) + parseInt(no_of_guest);

			//alert(tmember);
			//alert(max_member);
			//return false;
			if( parseInt(max_member) > 0)
			{
				if((tmember)>max_member)
				{
					showMessage('maximum member for this booking is ' + max_member ,null,'Error','OK');
					return false;
				}			
			}
			//no_of_member = $('#no_of_member :selected').text();
			//password = document.getElementById("password").value;
			//alert(no_of_member);
			//alert(cash_cardno2);
		  
			//if($('#username').val().length > 0 && $('#password').val().length > 0)
			
			if(cash_cardno2 == null || cash_cardno2.length == 0)
			{
				//alert('Please select Card No');
				showMessage('Please select Card No' ,null,'Error','OK');
				return false;
			}
			court_count = $('#court_no > option').length;
			slot_count = $('#slot_no > option').length;
			
			//alert(court_count);
			//alert(slot_count);
			
			if(no_of_member <=0)
			{
				//alert('Please select no of Member');
				showMessage('Please select no of Member' ,null,'Error','OK');
				return false;
			}
				
			if(court_count >1)
			{
				if(court_no <=0)
				{
					//alert('Please select Court');
					//return false;
				}				
			}
			
			//$("#max_member").val(max_member);
			//$("#bookwithoutslot").val(bookwithoutslot);
			//if(slot_count >1)
				
			var id_court_timing = '';
			var mem_charge2 = 0;
			var gue_charge2 = 0;
			var timing = '';
			if($("#bookwithoutslot").val() == 'Y')
			{
				if(slot_no <=0)
				{
					//alert('Please select Timing');
					showMessage('Please Select Timing' ,null,'Error','OK');
					return false;
				}else
				{
					//alert(slot_no);
					
					var divided4 = slot_no.split("###");
					mem_charge2 = divided4[0];
					gue_charge2 = divided4[1];
					timing = urldecode(divided4[2]);
					slot_no = timing;
					//alert(m_charge);
					//return false;
				}		
				known_as_txt_val = $("#known_as_txt").val();
				if(known_as_txt.length == 0)
				{
					known_as_txt_val = "Court";
				}
				alert(known_as_txt_val);
				selected_court = $("#selected_court").val();
				selected_court_no = $("#selected_court_no").val();
				selected_date = $("#dod option:selected").text();
				selected_timing = $("#slot_no option:selected").text();
				id_court_timing = '<strong>Date of Service: </strong>' + selected_date + '<br><strong>' + known_as_txt_val + ': </strong>' + selected_court + '<br/><strong>Timing: </strong>' + selected_timing + '<br/>';	
				//alert(selected_court);
				//alert(selected_court_no);
				
			}else
			{
				known_as_txt_val = $("#known_as_txt").val();
				if(known_as_txt.length == 0)
				{
					known_as_txt_val = "Court";
				}
				court_no = $("#court_no").val();
				if(court_no >0)
				{
					//$("#others2").html('<strong>Court: </strong>' + $('#court_no :selected').text() + '<br/>');
					id_court_timing = '<strong>' + known_as_txt_val + ': </strong>' + selected_court + '<br>';	

				}

				mem_charge2 = $("#m_charge").val();
				gue_charge2 = $("#g_charge").val();
			}
				
			//var comments_2 = '';
			//alert(id_court_timing);//return false;
			$("#t_nomember_lbl").html(no_of_member);
			$("#t_noguest_lbl").html(no_of_guest);
			$("#id_court_timing_lbl").html(id_court_timing);
			//$("#comments_2").html(comments_2);
			
			session_id = localStorage.getItem("session_id_local");
			//alert(session_id);
	
			//url = serviceURL + 'service_prop/' + ourclub_id;
			url = serviceURL + 'service_prop/' + localStorage.session_id_club_id;
					//alert(url);
					//return false;
					
			$.ajax({url: url,
				data: {session: session_id, service_id: service_id, dod: dod, court_no: court_no, slot: slot_no},
				type: 'post',                   
				async: 'true',
				dataType: 'json',
				beforeSend: function() {
					// This callback function will trigger before data is sent
					//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
					$.mobile.loading( "show" );
				},
				complete: function() {
					//alert('d');
					// This callback function will trigger on data sent/received complete
				   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
					$.mobile.loading( "hide" );
				},
				success: function (result) 
				{
					//alert('e');
					if(result.status == 'success') 
					{
						$.mobile.loading( "hide" );
						//alert('ok');
						//alert(result.message);
						//alert(result.timing);
						//alert(result.club_name);
			
					//alert(Object.keys(result.data.service).length);
					//alert('aaa');
					
					for(i2=0; i2<Object.keys(result.data.service).length; i2++)
					{
						//alert(result.data[i2].building_name);
						//alert(result.data[i2].wings);
						service_id = result.data.service[i2].service_id;
						service_name = result.data.service[i2].service_name;
						service_logo = result.data.service[i2].service_logo;
						charges = result.data.service[i2].charges;
						guest_charges = result.data.service[i2].guest_charges;
						game_rule = urldecode(result.data.service[i2].game_rule);
						comments = urldecode(result.data.service[i2].comments);
						max_member = result.data.service[i2].max_member;
						tax_code = result.data.service[i2].tax_code;
						Tax_rate = result.data.service[i2].Tax_rate;
						timing = urldecode(result.data.service[i2].timing);
						//game_rule = result.data.service[i2].game_rule;
						//comments = result.data.service[i2].comments;
						//alert(game_rule);
						//alert(tax_code);
														
					}
												
					//alert(Object.keys(result.data.dodservices).length);
					
					if(Object.keys(result.data.slots).length != 0)
					{
						for(i4=0; i4<Object.keys(result.data.slots).length; i4++)
						{
								//alert(result.data[i2].building_name);
								//alert(result.data[i2].wings);
								//court_id = result.data.slots[i4].court_id;
								//timesl_id = result.data.slots[i4].timesl_id;
								//timing = result.data.slots[i4].timing;
								//$('#slot_no2').append( new Option(court_id + '###' + timesl_id + '###' + timing,court_id + '###' + timesl_id + '###' + timing) );
								
								if($("#bookwithoutslot").val() == 'Y')
								{
									mem_charge2 = result.data.slots[i4].mem_charge;
									gue_charge2 = result.data.slots[i4].gue_charge;
								}
								timing2 = result.data.slots[i4].timing;
								timing2_2 = mem_charge2 + '###' + gue_charge2 + '###' + timing2;
								//alert(timing2_2);
								//timesl_id = result.data.slots[i4].timesl_id;
								//timing = result.data.slots[i4].timing;
								//alert(mem_charge2);return false;
								$('#slot_no').append( new Option(timing2, timing2_2) );										
						}

					}							
				//alert(gue_charge2);return false;
				//total_charge = (mem_charge2 * $("#no_of_member").val()) + (gue_charge2 * $("#no_of_guest").val());
				
				if(booking_logic == 'P')
				{
					total_charge = (mem_charge2 * no_of_member) + (gue_charge2 * $("#no_of_guest").val());
				}else
				{
					total_charge = (mem_charge2 * 1) + (gue_charge2 * $("#no_of_guest").val());
				}
				
				//alert(mem_charge2);
				//alert($("#m_charge").val());
				//alert($("#no_of_member").val());
				
				//alert(total_charge); return false;
				
				$("#total_charge").val(total_charge);
				$("#m_charge_lbl2").html(mem_charge2);
				$("#g_charge_lbl2").html(gue_charge2);
				$("#t_charge_lbl2").html(total_charge);
				$("#t_balance_lbl2").html(balance);
				var tax=0;
				if(tax_code == '1')//taxable
				{
					tax = ((total_charge * Tax_rate)/100);
					//alert(tax);
				}
				if(no_of_member > 0)
				{
					//alert(localStorage.getItem("session_id_local"));
					// Send data to server through the Ajax call
					// action is functionality we want to call and outputJSON is our data
					//alert('ok');
					
					$.mobile.changePage("#bookthreetest",null, true, true);
					court_no = $("#court_no").val();
					if(court_no >0)
					{
						//$("#others2").html('<strong>Court: </strong>' + $('#court_no :selected').text() + '<br/>');
					}
					//others2 <strong>Court: </strong>Court 1<br/>
				}
						
					} else 
					{
						//alert(result.message);
						$.mobile.loading( "hide" );								
						showMessage(result.message,null,result.message,'OK');
						//alert('Logon unsuccessful!');
					}
				},
				error: function (request,error) {
					// This callback function will trigger on unsuccessful action                
					//alert('Please check your data connection!');
					showMessage('Please check your data connection!',null,'Error','OK');
					$.mobile.loading( "hide" );	
				}
			});   			
			
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

$(document).on('pageinit', '#bookthreetest', function()
{  
	$(document).on('click', '#bookfinalbtncan', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			BookOne();
			e.handled = true;		
		}
		return false; // cancel original event to prevent form submitting
	});    
});

$(document).on('pageinit', '#bookthreetest', function()
{  
	$(document).on('click', '#bookfinalbtn', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);

			 // alert($('#lform').serialize());
			no_of_member = $("#no_of_member").val();
			//no_of_member = $('#no_of_member :selected').text();
			//password = document.getElementById("password").value;
			//alert(no_of_member);
			//alert($("#no_of_guest").val());
		  
			//if($('#username').val().length > 0 && $('#password').val().length > 0)
			if(no_of_member > 0)
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data
				//alert('ok');
				BookServices();
				//$.mobile.changePage("#bookthreetest",null, true, true);
				//court_no = $("#court_no").val();
				//if(court_no >0)
				//{
				//	$("#others2").html('<strong>Court: </strong>' + $('#court_no :selected').text() + '<br/>');
				//}
				//others2 <strong>Court: </strong>Court 1<br/>
			}else
			{
				alert('Please select no of Member');
				return false;
				e.handled = true;
			}
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function BookServices()
{		
	//alert(localStorage.getItem("device_browser"));
	service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	member = $("#no_of_member").val();
	guest = $("#no_of_guest").val();
	total_charge = $("#total_charge").val();
	//court_id = $("#court_no").val();
	court_id = $("#selected_court_no").val();
	slot_id = $("#slot_no").val();
	date_book = $("#dod").val();
	max_member = $("#max_member").val();
	bookwithoutslot = $("#bookwithoutslot").val();

	//alert((court_id));return false;
	//alert(max_member);
	//return false;
	if( parseInt(max_member) > 0)
	{
		if((parseInt(member) + parseInt(guest))> parseInt(max_member))
		{
			showMessage('maximum member for this booking is ' + max_member ,null,'Error','OK');
			return false;
		}
	}
	cash_cardno2 = document.getElementById("cash_cardno2").value;
	if(court_id == null)
	{
		court_id = '';
	}
	if(slot_id == null)
	{
		slot_id = '';
	}
	else
	{
		//alert(slot_no);
		//var divided4 = slot_no.split("###");
		//var slot_id = urldecode(divided4[2]);
	}
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&service_id="+ service_id +  "&member="+ member + "&guest="+ guest  + "&dod="+ date_book  + "&court="+ court_id + "&timing="+ slot_no + "&cash_cardno2="+ cash_cardno2;
	
	//alert(searchparam);return false;
	console.log(searchparam);
	//&member=1&guest=1&dod=2016-11-11&court=1&timing=10:10;
	//alert(searchparam);
	//return false;
	
	//else if(total_charge <= 0)
	//{
		//alert('Please select service before clicking on book');
	//	showMessage('Please select number of member before clicking on book',null,'Error','OK');
	//	return false;
	//}
	//alert(member);
	//alert(total_charge);
	if(member <= 0)
	{
		//alert('Please select service before clicking on book');
		showMessage('Please select number of member before clicking on book',null,'Error','OK');
		return false;
	}
	//alert($("#cdown").val());
	
	if($("#court_id").val() == '1')
	{
		if($("#cdown").val() == 0)
		{
			//alert('Please select service before clicking on book');
			//showMessage('Please select Court',null,'Error','OK');
			//return false;
		}
	}
	if($("#slot_id").val() == '1')
	{
		if($("#tsdown_1").val() == 0)
		{
			//alert('Please select service before clicking on book');
			//showMessage('Please select timing',null,'Error','OK');
			//return false;
		}
	}
	
	//alert("total_charge " + total_charge);
	//return false;
	//http://localhost/h_app/services/deduct_wallet/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&service_id=1
	//http://localhost/h_app/services/deduct_wallet_new/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&service_id=1&member=1&guest=1&dod=2016-11-11&court=1&timing=10:10
	

	//url = serviceURL + 'deduct_wallet_new/' + ourclub_id;
	url = serviceURL + 'deduct_wallet_new/' + localStorage.session_id_club_id;
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Booking Service ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
	
			$('#no_of_member').empty();
			$('#no_of_guest').empty();
			
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//ShowHome2();
			ListTicket(0);
			showMessage(result.message,null,appname,'OK');
			
			//alert(result.data.balance);
			console.log(result.message);
			localStorage.setItem("session_id_balance", result.data.balance);
			//GetIDDetailsInfo();
			GetIDDetailsInfo2();
			
			//ListTicket(1);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			
	
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        

//GetIDDetailsInfo();
}

$(document).on('pageinit', '#changepassword', function()
{  
	$(document).on('click', '#passbtn', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('it will change password');
			pass1 = $("#pass1").val();
			pass2 = $("#pass2").val();
			
			if(pass1.length<4)
			{
				//alert('Password is either empty or less than 4 character');
				showMessage('Password is either empty or less than 4 character',null,'Error','OK');
				
				return false;
			}			
			if(pass2.length<4)
			{
				//alert('Confirm Password is either empty or less than 4 character');
				showMessage('Confirm Password is either empty or less than 4 character',null,'Error','OK');
				return false;
			}
			if(pass1 != pass2)
			{
				//alert('Both Password not matching');
				showMessage('Both Password not matching',null,'Error','OK');
				return false;
			}		
			//alert('will change it');
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			session = localStorage.session_id_local;
			//alert(username);
			//alert(password);

			//return false;
		  
		//alert(localStorage.getItem("session_id_local"));
		// Send data to server through the Ajax call
		// action is functionality we want to call and outputJSON is our data

			$.mobile.loading( 'show', {
				text: 'Changing Password ...',
				textVisible: true,
				theme: 'a',
				html: ""
			});	
			
			//alert(serviceURL);
			//url = serviceURL + 'changepass/' + ourclub_id;
			url = serviceURL + 'changepass/' + localStorage.session_id_club_id;
			//alert(url);//return false;
			
			$.ajax({url: url,
				data: {newpass: pass1, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version, session: session},
				type: 'post',                   
				async: 'true',
				dataType: 'json',
				beforeSend: function() {
					// This callback function will trigger before data is sent
					//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
					$.mobile.loading( "show" );
				},
				complete: function() {
					// This callback function will trigger on data sent/received complete
				   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
					$.mobile.loading( "hide" );
				},
				success: function (result) {
					if(result.status == 'success') 
					{
						cash_ref_id = result.transaction_no;
						$.mobile.loading( "hide" );
						alert('Password changed');
						ShowHome();
					} else 
					{
						//alert(result.message);
						$.mobile.loading( "hide" );								
						showMessage(result.message,null,result.message,'OK');
						//alert('Logon unsuccessful!');
					}
				},
				error: function (request,error) {
					// This callback function will trigger on unsuccessful action                
					//alert('Please check your data connection!');
					showMessage('Please check your data connection!',null,'Error','OK');
					$.mobile.loading( "hide" );	
				}
			});                   
				
			e.handled = true;		
		}
		return false; // cancel original event to prevent form submitting
	});    
});

$(document).on('pageinit', '#forgotpasswd', function()
{  
	$(document).on('click', '#forgbtn', function(e) 
	{ // catch the form's submit event
		event.preventDefault();
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('it will change password');
			mobileno = $("#mobileforgot").val();
			selected_club_f = $('#club_select_f').val();
			
			//alert(username);
			//alert(selected_club);
			
			if(selected_club_f == null || selected_club_f.length == 0)
			{
				//alert('Please select Club'); 
				showMessage('Please select Club',null,'Error','OK');
				return false;
			}
						
			if(mobileno.length !=10)
			{
				//alert('Password is either empty or not equal to 10 character');
				showMessage('Mobile No is either empty or not equal to 10 character',null,'Error','OK');
				return false;
			}			

			//alert('will change it');
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//session = localStorage.session_id_local;
			//alert(username);
			//alert(password);

			//return false;
		  
		//alert(localStorage.getItem("session_id_local"));
		// Send data to server through the Ajax call
		// action is functionality we want to call and outputJSON is our data

			$.mobile.loading( 'show', {
				text: 'Retriving Password ...',
				textVisible: true,
				theme: 'a',
				html: ""
			});	
			
			//alert(serviceURL);
			//url = serviceURL + 'forgotpass/' + ourclub_id;
			//url = serviceURL + 'forgotpass/' + localStorage.session_id_club_id;
			url = serviceURL + 'forgotpass/' + selected_club_f;
			//alert(url);//return false;
			
			$.ajax({url: url,
				data: {mobileno: mobileno, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
				type: 'post',                   
				async: 'true',
				dataType: 'json',
				beforeSend: function() {
					// This callback function will trigger before data is sent
					//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
					$.mobile.loading( "show" );
				},
				complete: function() {
					// This callback function will trigger on data sent/received complete
				   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
					$.mobile.loading( "hide" );
				},
				success: function (result) {
					if(result.status == 'success') 
					{
						cash_ref_id = result.transaction_no;
						$.mobile.loading( "hide" );
						//alert('Password changed');
						showMessage(result.message,null,result.message,'OK');
						ShowHome();
					} else 
					{
						//alert(result.message);
						$.mobile.loading( "hide" );								
						showMessage(result.message,null,result.message,'OK');
						//alert('Logon unsuccessful!');
					}
				},
				error: function (request,error) {
					// This callback function will trigger on unsuccessful action                
					//alert('Please check your data connection!');
					showMessage('Please check your data connection!',null,'Error','OK');
					$.mobile.loading( "hide" );	
				}
			});                   
				
			e.handled = true;		
		}
		return false; // cancel original event to prevent form submitting
	});    
});
		
function closepop(popup)
{
	//alert(popup);
	
	$( popup).popup( "close" );
}

function Undercons()
{
	showMessage('Service Will start Soon',null,appname,'OK');
	//var ref = cordova.InAppBrowser.open('http://www.bluapps.in/pay/transaction.html', '_blank', 'location=no,toolbar=no,clearcache=yes');

}	

function changeToPassword(id) 
{
    document.getElementById(id).setAttribute("type", "password");
}