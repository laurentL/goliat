Ext.ns("Goliat");Goliat.TabPanel=Ext.extend(Ext.TabPanel,{messages:{tabAlreadyAdded:"The component panel {0} with type {1} already exists on panel. Skipping...",},initComponent:function(){this.addEvents("log","debug","warn","error");this.itemId="tabPanel";Goliat.TabPanel.superclass.initComponent.call(this)},addPanel:function(a,e){var c=this.items.items;for(var d=0;d<c.length;d++){if(Ext.isString(a)){if(c[d].getXType()===a&&Ext.encode(c[d].data)===Ext.encode(e)){this.activate(c[d]);return}}else{if(c[d].panelType==a.prototype.panelType&&Ext.encode(c[d].data)==Ext.encode(e)){this.activate(c[d]);return}}}if(!e){e={}}if(Ext.isString(a)){Ext.apply(e,{xtype:a});var b=this.add(e);this.activate(b.getItemId())}else{a=new a({data:e});this.add(a);this.activate(a)}}});Ext.reg("Goliat_tabpanel",Goliat.TabPanel);Ext.ns("Goliat.form");Goliat.form.RelationField=Ext.extend(Ext.form.TriggerField,{url:"",triggerClass:"x-form-relation-trigger",defaultAutoCreate:{tag:"input",type:"text",size:"24",autocomplete:"off"},emptyText:"",loadingText:"Loading...",relationModel:"Object",messages:{title:"Select a {0}",cancel:"Cancel",select:"Select",},initComponent:function(){Goliat.form.RelationField.superclass.initComponent.call(this);this.addEvents("select");if(this.url==""){return}this.modelStore=new Goliat.ModelStore({autoLoad:true,url:this.url})},onTriggerClick:function(){if(this.readOnly||this.disabled){return}this.sw=new Goliat.SelectionWindow({title:String.format(this.messages.title,this.relationModel),iconCls:"icon_search",items:new Ext.grid.GridPanel({store:this.modelStore.store,colModel:new Ext.grid.ColumnModel({defaults:{width:120,sortable:true},columns:this.modelStore.parseColumnModel(),}),viewConfig:{forceFit:true},sm:new Ext.grid.RowSelectionModel({singleSelect:true}),width:600,height:300}),buttons:[{text:this.messages.cancel,iconCls:"icon_cancel",scope:this,handler:this.cancelButton_onClick},{text:this.messages.select,iconCls:"icon_select",scope:this,handler:this.selectButton_onClick}]});this.sw.show()},cancelButton_onClick:function(){this.sw.close()},selectButton_onClick:function(a,b){console.debug(a);console.debug(b)}});Ext.reg("relation",Goliat.form.RelationField);Ext.ns("Goliat.grid");Goliat.grid.BooleanImageColumn=Ext.extend(Ext.grid.Column,{constructor:function(a){Goliat.grid.BooleanImageColumn.superclass.constructor.call(this,a);this.renderer=Ext.util.Format.boolImage()}});Goliat.grid.BooleanCheckColumn=Ext.extend(Ext.grid.Column,{constructor:function(a){Goliat.grid.BooleanImageColumn.superclass.constructor.call(this,a);this.renderer=Ext.util.Format.boolCheck()}});Goliat.grid.ArrayColumn=Ext.extend(Ext.grid.Column,{constructor:function(a){Goliat.grid.ArrayColumn.superclass.constructor.call(this,a);this.renderer=Ext.util.Format.ellipsis(this.width,true)}});Ext.apply(Ext.grid.Column.types,{booleanimagecolumn:Goliat.grid.BooleanImageColumn,booleancheckcolumn:Goliat.grid.BooleanCheckColumn,arraycolumn:Goliat.grid.ArrayColumn});Ext.ns("Goliat.layout");Goliat.layout.ThreeColumnsFLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){sidePanel=new Goliat.SidePanel({itemId:"sidePanel",region:"west",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});sidePanel2=new Goliat.SidePanel({itemId:"sidePanel2",region:"east",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 8px 0 8px 0;",items:[]});bottomPanel=new Ext.Panel({itemId:"bottomPanel",region:"south",height:100,minSize:100,});this.items=[sidePanel,centerPanel,sidePanel2,bottomPanel]}});Ext.ns("Goliat.layout");Goliat.layout.MainWindowLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 0px;",items:[]});this.items=[centerPanel]}});Ext.ns("Goliat.layout");Goliat.layout.ThreeColumnsLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){sidePanel=new Goliat.SidePanel({itemId:"sidePanel",region:"west",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});sidePanel2=new Goliat.SidePanel({itemId:"sidePanel2",region:"east",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 8px 8px 8px 0;",items:[]});this.items=[sidePanel,centerPanel,sidePanel2]}});Ext.ns("Goliat.layout");Goliat.layout.TwoColumnsFLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){sidePanel=new Goliat.SidePanel({itemId:"sidePanel",region:"west",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 8px 8px 8px 0;",items:[]});bottomPanel=new Ext.Panel({itemId:"bottomPanel",region:"south",height:100,minSize:100,});this.items=[sidePanel,centerPanel,bottomPanel]}});Ext.ns("Goliat.layout");Goliat.layout.TwoColumnsFhLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){sidePanel=new Goliat.SidePanel({itemId:"sidePanel",region:"west",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 8px 8px 8px 0;",items:[]});topPanel=new Ext.Panel({itemId:"topPanel",region:"north",height:60,minSize:60,});bottomPanel=new Ext.Panel({itemId:"bottomPanel",region:"south",height:100,minSize:100,});this.items=[sidePanel,centerPanel,topPanel,bottomPanel]}});Ext.ns("Goliat.layout");Goliat.layout.ThreeColumnsLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){sidePanel=new Goliat.SidePanel({itemId:"sidePanel",region:"west",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});sidePanel2=new Goliat.SidePanel({itemId:"sidePanel2",region:"east",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 8px 0 8px 0;",items:[]});topPanel=new Ext.Panel({itemId:"topPanel",region:"north",height:60,minSize:60,});this.items=[sidePanel,centerPanel,sidePanel2,topPanel]}});Ext.ns("Goliat.layout");Goliat.layout.TwoColumnsLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){sidePanel=new Goliat.SidePanel({itemId:"sidePanel",region:"west",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 8px 8px 8px 0;",items:[]});this.items=[sidePanel,centerPanel]}});Ext.ns("Goliat.layout");Goliat.layout.TwoColumnsHLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){sidePanel=new Goliat.SidePanel({itemId:"sidePanel",region:"west",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 8px 8px 8px 0;",items:[]});topPanel=new Ext.Panel({itemId:"topPanel",region:"north",height:60,minSize:60,});this.items=[sidePanel,centerPanel,topPanel]}});Ext.ns("Goliat.layout");Goliat.layout.ThreeColumnsFhLayout=Ext.extend(Object,{type:"goliat-layout",items:[],constructor:function(){this.setup()},setup:function(){sidePanel=new Goliat.SidePanel({itemId:"sidePanel",region:"west",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});sidePanel2=new Goliat.SidePanel({itemId:"sidePanel2",region:"east",width:208,split:true,minSize:208,maxSize:400,bodyStyle:"background: #ffffff;",items:[],});centerPanel=new Ext.Panel({layout:"fit",itemId:"centerPanel",region:"center",plain:true,enableTabScroll:true,style:"padding: 8px 0px 8px 0;",items:[]});topPanel=new Ext.Panel({itemId:"topPanel",region:"north",height:60,minSize:60,});bottomPanel=new Ext.Panel({itemId:"bottomPanel",region:"south",height:100,minSize:100,});this.items=[sidePanel,centerPanel,sidePanel2,topPanel,bottomPanel]}});Ext.ns("Goliat.base");Goliat.base.ListPanel=Ext.extend(Ext.Panel,{layout:"fit",initComponent:function(){this.items=this.buildListView();Goliat.base.ListPanel.superclass.initComponent.call(this);this.relayEvents(this.getView(),["click"]);this.relayEvents(this.getStore(),["load"])},buildListView:function(){return{}},buildStore:function(){return{xtype:"jsonstore"}},clearView:function(){this.getStore().removeAll()},clearSelections:function(){return this.getView().clearSelections()},getView:function(){return this.items.items[0]},getStore:function(){return this.getView().store},getSelectedRecords:function(){return this.getView().getSelectedRecords()},getSelected:function(){return this.getSelectedRecords()[0]},refreshView:function(){this.getView().store.reload()},selectById:function(c){var a=this.getView();c=c||false;if(c){var b=a.store.find("id",c);a.select(b)}},loadStoreByParams:function(a){a=a||{};this.getStore().load({params:a})}});Ext.ns("Goliat.base");Goliat.base.GridPanel=Ext.extend(Ext.grid.GridPanel,{autoExpandColumn:1,flex:1,border:false,loadMask:true,trackMouseOver:false,useModelStore:false,iconCls:"icon_grid",viewConfig:{forceFit:true},enableHdMenu:false,initComponent:function(){this.colModel=this.buildColModel();this.selModel=this.buildSelModel();this.listeners=this.buildListeners();Goliat.base.GridPanel.superclass.initComponent.call(this,arguments);if(this.useModelStore){this.modelStore=this.buildModelStore()}else{this.store=this.buildStore()}},buildColModel:function(){return{}},buildSelModel:function(){return new Ext.grid.RowSelectionModel({singleSelect:false,listeners:{selectionchange:{scope:this,fn:this.listGrid_onSelectionChange}}})},buildStore:function(){return{xtype:"jsonstore"}},buildListeners:function(){return{scope:this,rowdblclick:this.listGrid_onRowDblClick}},buildModelStore:function(){if(!this.useModelStore){this.useModelStore=true}return new Goliat.ModelStore({autoLoad:true,url:this.modelUrl,fieldsOrder:this.columnsOrder,listeners:{scope:this,onload:this.buildColModelStore}})},buildColModelStore:function(){if(!this.modelStore.loaded){this.modelStore.setUrl(this.modelUrl);this.modelStore.load();this.modelStore.loaded=true}this.colModel=new Ext.grid.ColumnModel(this.modelStore.parseColumnModel());this.fixRelations();if(this.columnsHidden){this.hideColumns()}if(this.hidePK){this.hidePrimaryKeys()}this.store=this.modelStore.store},hideColumns:function(){for(c in this.columnsHidden){if(c==="remove"){continue}this.getColumnModel().setHidden(this.getColumnModel().getIndexById(this.columnsHidden[c]),true)}},hidePrimaryKeys:function(){for(c in this.getColumnsByPK()){if(c!=="remove"){this.getColumnModel().setHidden(this.getColumnModel().getIndexById(this.getColumnsByPK()[c].id),true)}}},getColumnsByPK:function(){return this.getColumnModel().getColumnsBy(function(a){return a.primary===true})},fixRelations:function(){for(var a=0;a<this.getColumnModel().getColumnCount();a++){if(this.getColumnModel().getColumnAt(a).relation===true){this.relations.push(this.getColumnModel().getColumnAt(a));this.getColumnModel().config.splice(a,1)}}},load:function(a){if(!this.useModelStore){return this.store.load(a)}return this.modelStore.store.load(a)},loadData:function(a){return this.store.loadData(a)},removeAll:function(){return this.store.removeAll()},remove:function(a){return this.store.remove(a)},getSelected:function(){return this.selModel.getSelections()},getSelectedId:function(){var a=this.selModel.getSelected();return a==null?"":a.data.id},listGrid_onRowDblClick:function(b,d){var a=this.store.getAt(d);new Goliat.EditorWindow({url:this.modelUrl,modelStore:this.modelStore,grid:this,record:a}).show()},listGrid_onSelectionChange:function(){return}});Ext.ns("Goliat.base");Goliat.base.FormPanel=Ext.extend(Ext.form.FormPanel,{constructor:function(a){a=a||{};Ext.applyIf(a,{trackResetOnLoad:true});Goliat.base.FormPanel.superclass.constructor.call(this,a);if(this.record){this.on({scope:this,render:{single:true,fn:this.loadFormAfterRender}})}},getValues:function(){return this.getForm().getValues()},isValid:function(){return this.getForm().isValid()},clearForm:function(){var b={};for(var a in this.getValues()){b[a]=""}this.setValues(b);this.data=null},reset:function(){this.getForm().reset()},loadData:function(a){if(a){this.data=a;this.setValues(a)}else{this.clearForm()}},setValues:function(a){return this.getForm().setValues(a||{})},get:function(o){if(!o.url){return{success:false,error:"No url setted."}}Ext.Ajax.request({method:"GET",url:o.url,params:{act:"get",id:o.id},scope:this,callback:function(options,success,request){try{var response=eval("("+request.responseText+")")}catch(e){}if(!response){Goliat.Msg.error(this.messages.transactionError,this)}else{if(response.success===false){Goliat.Msg.error(response.error,this)}else{if(o.callback){o.callback.call(this,response)}}}}})},loadFormAfterRender:function(){this.get({url:this.url,id:this.record.get("id"),callback:function(a){this.loadData(a.data)}})}});Goliat.StompClient=function(a){this.options=a;this.socket=Orbited.TCPSocket;this.stomp=undefined;this.verbose=false;this.addEvents("onstompopen","onstompclose","onstomperror","onstomperrorframe","onstompconnectedframe","onstompmessageframe");Goliat.StompClient.superclass.constructor.call(this,a)};Ext.extend(Goliat.StompClient,Ext.util.Observable,{subscribeError:"The stomp service tried to start but there is no channel to subscribe",onopenMessage:"Stomp transport connection was successful.",opcloseMessage:"Stomp connection lost.<br />Reconnection attempt.",onerrorMessage:"Stomp service received an error:<br />",onerrroframeMessage:"Stompservice received an error:<br />",onconnecterrorMessage:"The Stomp Client tried to connect, but seems like the service is not configured.",getSocket:function(){return this.socket},getStomp:function(){return this.stomp},stompInit:function(){if(Ext.isEmpty(this.options.channel)){Goliat.Msg.error(this.subscribeError);return}this.stomp=new STOMPClient();this.stomp.onopen=function(){if(this.verbose){Goliat.Msg.alert(onopenMessage)}this.fireEvent("onstompopen",this)};this.stomp.onclose=function(a){Goliat.Msg.error(oncloseMessage);this.stomp.connect();this.fireEvent("onstompclose",this,a)};this.stomp.onerror=function(a){Goliat.Msg.error(onerrorMessage+a);this.fireEvent("onstomperror",this,a)};this.stomp.onerrorframe=function(a){Goliat.Msg.error(onerrorframeMessage+a.body);this.fireEvent("onstomperrorframe",this,a)};this.stomp.onconnectedframe=function(){this.stomp.subscribe(this.options.channel);this.stomp.ready=true;this.fireEvent("onstompconnectedfram",this)};this.stomp.onmessageframe=function(a){this.fireEvent("onstompmessageframe",this,a)}},stompConnect:function(){if(!this.stomp.ready){Goliat.Msg.error(this.onconnecterrorMessage);return}if(Ext.isEmpty(this.options.port)){this.options.port=61613}this.stomp.connect(document.domain,this.options.port)},stompDisconnect:function(){this.stomp.disconnect()},stompChannel:function(a){this.options.channel=a},stompPort:function(a){this.options.port=a},changeSubscription:function(a){this.stomp.unsubscribe(this.options.channel);this.options.channel=a;this.stomp.subscribe(a)},onSend:function(a){this.stomp.send(Ext.util.JSON.encode(a),this.options.channel)}});Goliat.ModelStore=function(a){Ext.apply(this,a);this.modelSchema=[];this.loaded=false;this.addEvents("onload","onflush");Goliat.ModelStore.superclass.constructor.call(this,a);if(this.autoLoad){this.load.defer(10,this)}};Ext.extend(Goliat.ModelStore,Ext.util.Observable,{messages:{transactionError:"Error with data transaction.",True:"True",False:"False",yes:"Yes",no:"No"},writer:new Ext.data.JsonWriter({encode:true,writeAllFields:false}),load:function(){if(!this.url){return{success:false,error:"No url setted."}}Ext.Ajax.request({method:"GET",url:this.url,params:{act:"getSchemaModel"},scope:this,callback:function(options,success,request){try{var response=eval("("+request.responseText+")")}catch(e){}if(!response){Goliat.Msg.error(this.messages.transactionError,this)}else{if(response.success===false){Goliat.Msg.error(response.error,this)}else{this.modelSchema=response.model;this.loaded=true;this.lookup={};for(c in this.modelSchema){if(c=="remove"){continue}this.lookup[this.modelSchema[c].name]=this.modelSchema[c]}if(!this.store){this.store=new Ext.data.JsonStore({id:this.url.replace(/\//g,""),proxy:new Ext.data.HttpProxy({api:{read:{url:this.url+"?act=view",method:"GET"},create:{url:this.url+"?act=create",method:"POST"},update:{url:this.url+"?act=update",method:"POST"},destroy:{url:this.url+"?act=delete",method:"POST"}}}),writer:this.writer,fields:this.getFields(),sortInfo:{field:"id",direction:"ASC"},autoSave:true});this.store.load()}this.fireEvent("onload",this)}}}})},reload:function(){this.load()},flush:function(){this.modelSchema=null;this.fireEvent("onflush",this)},setUrl:function(a){this.url=a},getModelSchema:function(){return this.modelSchema},getFieldById:function(a){return this.lookup[a]},hasRelation:function(b){for(var a=0;a<this.modelSchema.length;a++){if(this.modelSchema[a].relation!==true){continue}if(!this.modelSchema[a].config.localKey){localKey=this.modelSchema[a].config.foreignTable+"_"+this.modelSchema[a].config.foreignKey}else{localKey=this.modelSchema[a].config.localKey}if(b==localKey){return this.modelSchema[a].name}}return false},getIndexById:function(a){for(c in this.modelSchema){if(c=="remove"){continue}if(this.modelSchema[c].name==a){return c}}return -1},moveField:function(d,a){var b=this.modelSchema[d];this.modelSchema.splice(d,1);this.modelSchema.splice(a,0,b)},getFields:function(){fields=[];for(c in this.modelSchema){if(c=="remove"){continue}fields.push(this.modelSchema[c].name)}return fields},parseFormModel:function(){fields_model=Array();for(obj in this.modelSchema){if(!isNaN(obj)){field_data={};if(this.modelSchema[obj].relation===true){continue}else{field_data.fieldLabel=Ext.util.Format.capitalize(this.modelSchema[obj].name.replace(/_/g," "));field_data.name=this.modelSchema[obj].name;field_data.anchor="-10";(this.modelSchema[obj].required)?field_data.allowBlank=false:field_data.allowBlank=true;(Ext.isDefined(this.modelSchema[obj].config.size))?field_data.maxLength=this.modelSchema[obj].config.size:50;switch(this.parseType(this.modelSchema[obj])){case"string":if(Ext.isDefined(this.modelSchema[obj].config.size)&&this.modelSchema[obj].config.size<=100){field_data.xtype="textfield"}else{if(Ext.isDefined(this.modelSchema[obj].config.size)&&this.modelSchema[obj].config.size>100){field_data.xtype="textarea"}else{field_data.xtype="textfield"}}break;case"number":field_data.xtype="numberfield";break;case"real":field_data.xtype="numberfield";field_data.allowDecimals=true;field_data.decimalPrecision=2;break;case"boolean":field_data.xtype="radiogroup";field_data.columns="auto";field_data.items=[{inputValue:"0",boxLabel:this.messages.yes},{inputValue:"1",boxLabel:this.messages.no}];break;case"date":case"datetime":field_data.xtype="datefield";break;case"time":field_data.xtype="timefield";break;case"list":field_data.xtype="multiselect";break;default:field_data.xtype="textfield"}if(this.modelSchema[obj].config.primaryKey){field_data.xtype="hidden"}fields_model.push(field_data)}}}return fields_model},parseColumnModel:function(){columns_model=Array();for(obj in this.modelSchema){if(!isNaN(obj)){column_data={};if(this.modelSchema[obj].relation===true){continue}column_data.header=Ext.util.Format.capitalize(this.modelSchema[obj].name.replace(/_/g," "));column_data.dataIndex=this.modelSchema[obj].name;(this.modelSchema[obj].size)?column_data.width=this.modelSchema[obj].size:80;column_data.sortable=true;column_data.id=this.modelSchema[obj].name;column_data.sqlType=this.parseType(this.modelSchema[obj]);switch(this.parseType(this.modelSchema[obj])){case"string":column_data.xtype="gridcolumn";break;case"number":column_data.xtype="numbercolumn";column_data.format="0";break;case"real":column_data.xtype="numbercolumn";column_data.format="0.00";break;case"boolean":if(this.boolImage){column_data.xtype="booleanimagecolumn"}else{if(this.boolCheck){column_data.xtype="booleancheckcolumn"}else{column_data.xtype="booleancolumn"}}break;case"date":case"time":case"datetime":column_data.xtype="datecolumn";break;case"list":column_data.xtype="arraycolumn";break;default:column_data.xtype="gridcolumn";break}if(this.modelSchema[obj].config.primaryKey){column_data.primary=true}else{column_data.primary=false}columns_model.push(column_data)}}return columns_model},parseType:function(a){type=null;switch(a.config.type.toLowerCase()){case"varchar":case"longvarchar":case"unicode":case"rawstr":case"any":type="string";break;case"integer":case"smallint":case"longint":case"serial":case"bigserial":type="number";break;case"real":case"float":case"double":case"decimal":type="real";break;case"bool":case"boolean":type="boolean";break;case"date":type="date";break;case"time":type="time";break;case"timestamp":type="datetime";break;case"timedelta":type="time";break;case"list":type="array";break;default:type="string";break}return type}});Ext.ns("Goliat.util");Goliat.util.DomHelper=Ext.extend(Object,{constructor:function(a){this.listeners=a.listeners?a.listeners:a},init:function(d){var b,a=this.listeners;for(b in a){if(Ext.isFunction(a[b])){a[b]=this.createHandler(a[b],d)}else{a[b].fn=this.createHandler(a[b].fn,d)}}d.render=d.render.createSequence(function(){var c=d.getEl();if(c){c.on(a)}})},createHandler:function(a,b){return function(c){a.call(this,c,b)}}});Ext.ns("Goliat.util");Goliat.util.Logger=Ext.extend(Ext.BoxComponent,{tpl:new Ext.Template('<li class="x-log-entry x-log-{0:lowercase}-entry">','<div class="x-log-level">','   <span class="x-log-time">',"       {2:date([H:i:s.u])}","   </span>",'   <span class="x-log-message">',"       {1}","   </span>","</div>","</li>"),autoEl:{tag:"ul",cls:"x-logger x-log-show-info"},last:undefined,startMessage:"Starting Log Console...",onRender:function(){Goliat.util.Logger.superclass.onRender.apply(this,arguments);this.contextMenu=new Ext.menu.Menu({items:[new Ext.menu.CheckItem({id:"debug",text:"Debug",checkHandler:Goliat.util.Logger.prototype.onMenuCheck,scope:this}),new Ext.menu.CheckItem({id:"info",text:"Info",checkHandler:Goliat.util.Logger.prototype.onMenuCheck,scope:this,checked:true}),new Ext.menu.CheckItem({id:"warning",text:"Warning",checkHandler:Goliat.util.Logger.prototype.onMenuCheck,scope:this}),new Ext.menu.CheckItem({id:"error",text:"Error",checkHandler:Goliat.util.Logger.prototype.onMenuCheck,scope:this})]});this.el.on("contextmenu",this.onContextMenu,this,{stopEvent:true});this.last=this.tpl.insertFirst(this.el,["debug",this.startMessage,new Date()])},onContextMenu:function(a){this.contextMenu.logger=this;this.contextMenu.showAt(a.getXY())},onMenuCheck:function(b,d){var c=b.parentMenu.logger;var a="x-log-show-"+b.id;if(d){c.el.addClass(a)}else{c.el.removeClass(a)}},debug:function(a){this.last=this.tpl.insertAfter(this.last,["debug",a,new Date()]);this.el.scroll("bottom",this.el.getHeight(),false)},info:function(a){this.last=this.tpl.insertAfter(this.last,["info",a,new Date()]);this.el.scroll("bottom",this.el.getHeight(),false)},warning:function(a){this.last=this.tpl.insertAfter(this.last,["warning",a,new Date()]);this.el.scroll("bottom",this.el.getHeight(),false)},error:function(a){this.last=this.tpl.insertAfter(this.last,["error",a,new Date()]);this.el.scroll("bottom",this.el.getHeight(),false)}});Ext.reg("Goliat_logger",Goliat.util.Logger);Ext.ns("Goliat.util");Goliat.util.Format=function(){return{boolImage:function(a){if(a){return'<img class="icon_on" src="/extjs/resources/images/default/s.gif" title="Running" style="margin: -1px 4px -1px 0; width: 16px; height: 16px; vertical-align: middle;" />'}else{return'<img class="icon_off" src="/extjs/resources/images/default/s.gif" title="Down" style="margin: -1px 4px -1px 0; width: 16px; height: 16px; vertical-align: middle;" />'}},boolCheck:function(a){if(a){return'<input type="checkbox" value="true" checked="checked" />'}else{return'<input type="checkbox" value="false" />'}},eurMoney:function(a){a=(Math.round((a-0)*100))/100;a=(a==Math.floor(a))?a+".00":((a*10==Math.floor(a*10))?a+"0":a);a=String(a);var e=a.split("."),d=e[0],b=e[1]?"."+e[1]:".00",c=/(\d+)(\d{3})/;while(c.test(d)){d=d.replace(c,"$1,$2")}a=d+b;if(a.charAt(0)=="-"){return"-"+a.substr(1)+"€"}return a+"€"}}}();Ext.apply(Ext.util.Format,Goliat.util.Format);Ext.ns("Goliat");Goliat.EditorWindow=Ext.extend(Ext.Window,{layout:"fit",width:(Ext.isIE)?620:590,height:(Ext.isIE)?255:245,modal:true,resizable:true,draggable:true,center:true,closable:false,messages:{titlenew:"Add new {0}",titleedit:"Editing : {0}",saving:"Saving {0}...",cancel:"Cancel",save:"Save"},initComponent:function(){Ext.applyIf(this,{title:this.configureTitle(),iconCls:(this.record)?"icon_edit_edit":"icon_edit_add",items:this.buildItems(),buttons:this.buildButtons()});this.addEvents({recordsaved:true,});Goliat.EditorWindow.superclass.initComponent.call(this)},buildItems:function(){return new Goliat.base.FormPanel({url:this.url,bodyStyle:"padding: 10px",layout:"form",border:false,itemId:"recordForm",record:this.record,items:[this.modelStore.parseFormModel()],tbar:null})},buildButtons:function(){return[{text:this.messages.cancel,iconCls:"icon_cancel",scope:this,handler:this.cancelButton_onClick},{text:this.messages.save,iconCls:"icon_save",scope:this,handler:this.saveButton_onClick}]},configureTitle:function(){if(this.record&&this.record instanceof Ext.data.Record){return String.format(this.messages.titleedit,(this.grid.nameKey)?this.record.get(this.grid.nameKey):this.record.get("name"))}else{return String.format((Ext.isDefined(this.grid)&&Ext.isDefined(this.grid.titleName))?this.grid.titleName:"Record")}},cancelButton_onClick:function(){this.close()}});Ext.ns("Goliat");Goliat.MessageBox=function(){var b={modal:true,resizable:false,closable:false,border:false,constraint:true,constrainHeader:true,stateful:false,plain:true,footer:true,shim:true,bodyStyle:"padding: 8px;",buttonAlign:"center",};informationText="Information";confirmText="Confirmation";errorText="Error";acceptText="Accept";yesText="Yes";noText="No";var a=false;return{show:function(c){Ext.apply(b,c);if(Ext.isWebKit){Ext.apply(b,{width:400})}a=new Ext.Window(b);a.show()},alert:function(d,c,e){this.show({html:d,iconCls:"icon_information",title:informationText,buttons:[new Ext.Button({minWidth:80,iconCls:"icon_accept",text:acceptText,scope:this,handler:function(){a.close()}})]});return this},confirm:function(d,c,e){this.show({html:d,iconCls:"icon_confirm",title:confirmText,buttons:[new Ext.Button({minWidth:80,iconCls:"icon_accept",text:yesText,scope:this,handler:function(){a.close();if(e){e.call(c||window,"yes")}}}),new Ext.Button({minWidth:80,iconCls:"icon_cancel",text:noText,scope:this,handler:function(){a.close();if(e){e.call(c||window,"no")}}})]});return this},error:function(d,c,e){this.show({html:d,iconCls:"icon_error",title:errorText,buttons:[new Ext.Button({minWidth:80,iconCls:"icon_accept",text:acceptText,scope:this,handler:function(){a.close();if(e){e.call(c||window,"ok")}}})]});return this},informationText:"Information",acceptText:"Accept",confirmText:"Confirmation",errorText:"Error",yesText:"Yes",noText:"No"}}();Goliat.Msg=Goliat.MessageBox;Ext.ns("Goliat");Goliat.SidePanel=Ext.extend(Ext.Panel,{messages:{menuAlreadyExists:"The component menu {0} with type {1} already exists at side panel. Skipping..."},style:"padding: 8px;",autoScroll:true,layout:"accordion",layoutConfig:{hideCollapseTool:true,animate:true,fill:false},initComponent:function(){this.addEvents("log","debug","warn","error");Goliat.SidePanel.superclass.initComponent.call(this,arguments)},addMenu:function(d){var b=this.items.items;for(var a=0;a<b.length;a++){if(b[a].menuType==d.menuType){var c=String.format(this.messages.menuAlreadyExists,d.title,d.menuType);this.fireEvent("debug",this,c);return}}this.add(d)},removeMenu:function(c){var b=this.sidePanel.items.items;for(var a=0;a<b.length;a++){if(b[a].menuType==c){this.remove(b[a])}}}});Ext.reg("Goliat_sidepanel",Goliat.SidePanel);Goliat.SidePanelMenu=Ext.extend(Ext.Component,{iconCls:"",title:"",constructor:function(a){a=a||{};this.iconCls=a.iconCls||"no_icon";this.title=a.title||"Undefined";Goliat.SidePanelMenu.superclass.constructor.call(this,a)},initComponent:function(){this.html=String.format('<div class="taskbar_item"><img class="{0}" src="/extjs/resources/images/default/s.gif" />{1}</div>',this.iconCls,this.title);Goliat.SidePanelMenu.superclass.initComponent.call(this)}});Ext.reg("Goliat_sidepanel_menu",Goliat.SidePanelMenu);Ext.ns("Goliat");Goliat.LogPanel=Ext.extend(Ext.Panel,{layout:"fit",enableTabScroll:true,autoScroll:true,margins:"0 0 0 0",bodyStyle:"padding-left: 10px; font-size: 10px;",initComponent:function(){this.logger=new Goliat.util.Logger();this.items=this.logger;Goliat.LogPanel.superclass.initComponent.call(this)},registerLog:function(a,b){switch(a){case"debug":this.logger.debug(b);break;case"warn":this.logger.warning(b);break;case"error":this.logger.error(b);break;default:this.logger.info(b)}}});Ext.reg("Goliat_logpanel",Goliat.LogPanel);