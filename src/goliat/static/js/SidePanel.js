/*

  Goliat ExtJS: The Twisted and ExtJS Web Framework
  Copyright (C) 2010  Open Phoenix IT

  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU General Public License
  as published by the Free Software Foundation; either version 2
  of the License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

*/

Ext.ns('Goliat');

/**
 * @class Goliat.SidePanel
 * @extends Ext.Panel
 *  Create a new Accordion SidePanel with methods to add and remove Menu Items from it.
 * @constructor 
 * @params {Object} config The config Object
 * @xtype Goliat_sidepanel
 */
Goliat.SidePanel = Ext.extend(Ext.Panel, {
    messages        : {        
        menuAlreadyExists       : 'The component menu {0} with type {1} already exists at side panel. Skipping...'
    },    
    autoScroll      : true,
    layout          : "accordion",
    layoutConfig    : {
        hideCollapseTool    : true,
        animate             : true,
        fill                : false
    },    
    
    initComponent: function() {        
        this.addEvents( 'log', 'debug', 'warn', 'error' );
        Goliat.SidePanel.superclass.initComponent.call(this, arguments); 
        
        if(this.url) {
            Ext.Ajax.request({
                url         : this.url,
                method      : 'GET',                
                scope       : this,
                callback    : function(options, success, result) {                    
                    if(success == true) {                
                        var jsonData;
                        try {
                            jsonData = Ext.decode(result.responseText);
                        } catch(e) {
                            Goliat.Msg.error('The returned data is not valid data.', this);
                        }
                        if(jsonData.success == true) {                            
                            for(var i = 0; i < jsonData.items.length; i++) {                                
                                tmpitem = jsonData.items[i];                                                                
                                var item = {};                                
                                item.border = false;
                                item.hideBorders = true;
                                item.menuType = tmpitem.menuType;
                                item.iconCls = tmpitem.iconCls;
                                item.title = tmpitem.title;
                                item.items = [];
                                if (tmpitem.items) {
                                    for (var x = 0; x < tmpitem.items.length; x++) {
                                        item.items.push({
                                            iconCls: tmpitem.items[x].iconCls,
                                            title: tmpitem.items[x].title,
                                            xtype: tmpitem.items[x].xtype,
                                            plugins: eval(tmpitem.items[x].plugins)
                                        });
                                    }
                                }                                
                                this.addMenu(item);       
                                                       
                            }
                            this.doLayout();
                        } else {
                            Goliat.Msg.error(jsonData.error, this);
                        }
                    } else {
                        Goliat.Msg.error('SidePanel Error:',+this.url+' does not returned valid data!', this);                
                    }                    
                }
            })
        }
    },
    
    addMenu: function(menu) {
        var menus = this.items.items;
        for(var i = 0; i < menus.length; i++) {
            if(menus[i].menuType == menu.menuType ) {
                var msg = String.format(this.messages.menuAlreadyExists, menu.title, menu.menuType);
                this.fireEvent('debug', this, msg);
                return;
            }
        }
        
        this.add(menu);        
    },
    
    removeMenu: function(menu) {
        var menus = this.sidePanel.items.items;
        for(var i = 0; i < menus.length; i++) if(menus[i].menuType == menu) this.remove(menus[i]);
    }
}); 

Ext.reg('Goliat_sidepanel', Goliat.SidePanel);


/**
 * @class Goliat.SidePanelMenu
 * @extends Ext.Component
 *  Create a new SidePanel sub menu.
 * @constructor
 * @params {Object} config The config Object
 * @xtype Goliat_sidepanel_menu  
 */
Goliat.SidePanelMenu = Ext.extend(Ext.Component, {
    iconCls     : '',
    title       : '',    
    
    constructor: function(config) {
        config = config || {};
        this.iconCls = config.iconCls || "no_icon";
        this.title = config.title || "Undefined";                
        
        Goliat.SidePanelMenu.superclass.constructor.call(this, config);
    },
    
    initComponent: function() {        
        this.html = String.format('<div class="taskbar_item"><img class="{0}" src="/extjs/resources/images/default/s.gif" />{1}</div>', this.iconCls, this.title);      
        
        Goliat.SidePanelMenu.superclass.initComponent.call(this);
    }
});

Ext.reg('Goliat_sidepanel_menu', Goliat.SidePanelMenu);
