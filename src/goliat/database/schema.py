# -*- coding: utf-8 -*-
##
# Goliat: The Twisted and ExtJS Web Framework
# Copyright (C) 2010 Open Phoenix IT
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA
##
# $id Goliat/src/goliat/database/schema.py created on 13/04/2010 15:54:26 by damnwidget $
'''
Created on 13/04/2010 15:54:26

@license: GPLv2
@copyright: © 2010 Open Phoenix IT SCA
@organization: Open Phoenix IT S.Coop.And
@author: Oscar Campos
@contact: oscar.campos@open-phoenix.com
@summary:
@version: 0.1
'''
import os, yaml

class SchemaException(Exception):
    pass

class Schema(object):
    """Goliat YAML based Schema object"""
    _schemaFile = None    
    _schema = {}
    _fixed = False
    
    def __init__(self, schemaFile):
        if os.path.exists(schemaFile):
            self._schemaFile = schemaFile
        else:
            raise SchemaException('The database schema {0} doesn\'t exists.'.format( schemaFile ))             
        
        super(Schema, self).__init__()                        
        self._loadSchema()      
    
    def getTables(self):
        """Return the schema tables"""
        try : 
            tables = self._schema['database']['tables']
        except KeyError:
            raise SchemaException('Unable to get tables on this database schema, revise your yaml schema definition.')             
        return tables
    
    def getProperties(self):
        """Return the schema properties"""
        try:
            properties = self._schema['database']['_properties']
        except KeyError:
            raise SchemaException('Unable to get database _properties, revise your yaml schema definition.')            
        return properties
    
    def getColumnData(self, table, column):
        """Return data from column on table"""
        try:
            properties = self._schema['database']['tables'][table][column]
        except KeyError:
            raise SchemaException('Unable to resolve column {0} properties on {1} table, revise your yaml schema definition.'.format( column, table ))
        return properties
    
    def getColumnPropertyData(self, table, column, property):
        """Return table column attribute value"""
        try:
            data = self._schema['database']['tables'][table][column][property]
        except KeyError:
            raise SchemaException('Unable to resolve column {0} property {1} data on {1} table, revise your yaml schema definition.'.format( column, property, table ))
        return data
    
    def setColumnPropertyData(self, table, column, property, data):
        """Sets table column attribute value"""
        self._schema['database']['tables'][table][column][property] = data
    
    def setColumnData(self, table, column, data):
        """Sets column attributes values"""
        self._schema['database']['tables'][table][column] = data
    
    def findTable(self, name):
        """Find a table on schema and return it"""
        for table, column in self.getTables().iteritems():        
            if name == table or column.get('_config') != None and column['_config'].get('modName') != None and column['_config']['modName'] == name:
                return column 
        return False
    
    def getTablesList(self):
        """Return a list of tables"""
        return self._schema['database']['tables'].keys()
    
    def hasRelation(self, table):
        """Returns true if the table has an relation"""
        if table.get('_relation') != None:
            return True
        
        return False
    
    def many2many(self):
        """Get all the many to many relations on schema"""
        relations = []
        for table, cols in self.getTables().iteritems():
            if self.hasRelation(cols):
                for field, definition in cols['_relation'].iteritems():
                    if definition.get('foreignKey') != None:
                        if self.findTable(definition['foreignTable']) != False:
                            data = {
                                'table' : table+'_'+definition['foreignTable'],
                                'keys'  : definition.get('keys'),
                                'fields': definition.get('fields')                             
                            }
                            relations.append(data)   
        return relations                
                    
    
    def fixTables(self):
        """Fix tables for empty types"""
        if self._fixed:
            return
        if not len(self.getTables()):
            return (False, 'The data tables are empty.')
        
        for table, columns in self.getTables().iteritems():
            pKey = False
            
            for column, properties in columns.iteritems():
                if column in ['_config', '_relation', '_indexes']:
                    continue
                # Fix the '~' columns at Yaml definition
                if properties is None:
                    if column == 'created_at' or column == 'updated_at':
                        self.setColumnPropertyData(table, column, type, 'timestamp')
                    
                    if column == 'id':
                        data = {
                            'type'          : 'integer',
                            'required'      : True,
                            'primaryKey'    : True,
                            'autoIncrement' : True
                        }
                        self.setColumnData(table, column, data)
                        pKey = True  
                    
                    if column.endswith('_id') and len(column.split('_id')[0]) == column.find('_id'):
                        fTable = self.findTable(column.split('_id')[0])
                        if fTable:
                            data = {
                                'type'              : 'integer',
                                'foreignTable'      : fTable,
                                'foreignReference'  : 'id'
                            }
                            self.setColumnData(table, column, data)
                        else:
                            raise SchemaException('Unable to resolve foreign table for column {0} on table {1}'.format( column, table ))
                else:
                    if not isinstance(properties, dict):
                        raise SchemaException('Column {0} properties are not a dict, the only valid values for define columns are dicts'.format( column ))                    
                    if properties.get('primaryKey') != None:
                        pKey = True
                
            if not pKey:
                data = {
                    'type'          : 'integer',
                    'required'      : True,
                    'primaryKey'    : True,
                    'autoIncrement' : True
                }
                self.setColumnData(table, column, data)
        
        self._fixed = True

        return (True, '')
    
    def _loadSchema(self):
        """Loads a schema from file"""
        stream = file(self._schemaFile, 'r')
        self._schema = yaml.load(stream)
