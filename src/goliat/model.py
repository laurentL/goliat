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
# $id Goliat/src/goliat/model.py created on 16/04/2010 20:22:44 by damnwidget $
'''
Created on 16/04/2010 20:22:44

@license: GPLv2
@copyright: © 2010 Open Phoenix IT SCA
@organization: Open Phoenix IT S.Coop.And
@author: Oscar Campos
@contact: oscar.campos@open-phoenix.com
@summary:
@version: 0.1
'''
from goliat.database.schema import Schema, SchemaException
from goliat.template import TemplateManager
from goliat.cli.utils.output import bold, green
from datetime import datetime

_yaml_to_storm = {
    'bool'          : 'Bool',
    'boolean'       : 'Bool',
    'integer'       : 'Int',
    'smallint'      : 'Int',
    'longint'       : 'Int',
    'serial'        : 'Int',
    'bigserial'     : 'Int',
    'real'          : 'Int',
    'float'         : 'Float',
    'double'        : 'Float',
    'decimal'       : 'Decimal',
    'unicode'       : 'Unicode',
    'varchar'       : 'Unicode',
    'longvarchar'   : 'Unicode',
    'rawstr'        : 'RawStr',
    'any'           : 'Pickle',
    'timestamp'     : 'DateTime',
    'date'          : 'Date',
    'time'          : 'Time',
    'timedelta'     : 'TimeDelta',
    'list'          : 'List',
    'enum'          : 'Enum'
}

def tr(yaml_type):
    """Translate a yaml type to storm type"""
    return _yaml_to_storm[yaml_type.lower()]

class Generator(object):
    _schema = None
    _mgr = TemplateManager()
    
    def __init__(self, verbose=False):        
        self._verbose = verbose
        self._schema = Schema('config/schema.yaml')        
        if self._verbose: print bold('Fixing null values on schema...')
        (success, msg) = self._schema.fixTables()
        if not success:
            raise SchemaException(msg)
        if self._verbose: print green('Schema fixed!')
    
    def generateModels(self):        
        for table, columns in self._schema.getTables().iteritems():
            modName, tpl = self.generateModelBase(table, columns)
            self.writeBaseModel(modName, tpl)
            modName, tpl = self.generateModel(table, columns)
            self.writeModel(modName, tpl)
    
    def create_b(self, table, columns):        
        templates = {
            'base'  : self.generateModelBase(table, columns),            
            'rel'   : self.generateMany2Many(table, columns)
        }
        
        return templates
    
    def create_m(self, table, columns):
        return {
            'work'  : self.generateModel(table, columns)
        }
    
    def generateModel(self, table, columns):        
        t = self._mgr.getSysDomain().get_template('tpl/model.evoque')        
        modelName = self._generateModelName(table)
        return (modelName, t.evoque(
            model_name=modelName,
            model_creation_date=datetime.now(),
            model_file='application/model/{0}'.format( modelName ),            
        ))
    
    def generateModelBase(self, table, columns):        
        t = self._mgr.getSysDomain().get_template('tpl/modelbase.evoque')        
        relation = columns['_relation'] if columns.get('_relation') != None else None
        modelName = self._generateModelName(table)
        _attributes = []
        _relations = []
        _model_primary_keys = self._checkComposedKeys(columns)

        for col in columns:
            if col in [ '_config', '_indexes', '_relation' ]: continue
            attrName = col
            if len(_model_primary_keys):
                attrType = self._parseColumn(columns[col], True)
            else:
                attrType = self._parseColumn(columns[col])
            
            _attributes.append((attrName, attrType))            
        if relation != None:
            for field, rel in relation.iteritems():                                
                if rel['type'] == 'one2one':                    
                    _attributes.append(('{0}_id'.format(field), 'Int()'))
                    _attributes.append((field, 'Reference({0}_id, "{1}.{2}"'.format(field, self._generateModelName(rel['foreignTable']), rel['foreignKey'])))
                    _relations.append(('application.model.base.{0}Base'.format(self._generateModelName(rel['foreignTable'])),
                        '{0}Base'.format(self._generateModelName(rel['foreignTable']))))                    
                elif rel['type'] == 'many2one':
                    _attributes.append(('{0}'.format(field, 'ReferenceSet("{0}.{1}", "{2}.{3})'.format( 
                        self._generateModelName(table), rel['localKey'], self._generateModelName(rel['foreignTable']), rel['foreignKey'] ))))
                    _relations.append(('application.model.base.{0}Base'.format(self._generateModelName(rel['foreignTable'])),
                        '{0}Base'.format(self._generateModelName(rel['foreignTable']))))
                elif rel['type'] == 'many2many':
                    reference = 'ReferenceSet('
                    _new_keys = []
                    for key in rel['keys']:
                        if type(key) == str: _new_keys.append(key)
                        elif type(key) == dict: _new_keys.append(key.keys()[0])
                    
                    reference += '"{0}.{1}", '.format( self._generateModelName(table), rel['localKey'] )
                    reference += '"{0}.{1}", '.format( self._generateModelName(table)+self._generateModelName(rel['foreignTable']), _new_keys[0] )
                    reference += '"{0}.{1}", '.format( self._generateModelName(table)+self._generateModelName(rel['foreignTable']), _new_keys[1] )
                    reference += '"{0}.{1}"'.format( self._generateModelName(rel['foreignTable']), rel['foreignKey'] )
                    reference += ')'                    
                    _attributes.append(('{0}'.format(field), reference))                    
                    _relations.append(('application.model.base.{0}Base'.format(self._generateModelName(rel['foreignTable'])),
                        '{0}Base'.format(self._generateModelName(rel['foreignTable']))))
                    _relations.append((
                        'application.model.relation.{0}'.format(self._generateModelName(table)+self._generateModelName(rel['foreignTable'])),
                        self._generateModelName(table)+self._generateModelName(rel['foreignTable'])
                    ))                    
        
        return (modelName, t.evoque(
            model_name=modelName,
            model_creation_date=datetime.now(),
            model_file='application/model/base/{0}'.format( modelName ),
            model_table='{0}'.format( table ),
            model_primary_keys=_model_primary_keys,
            attributes=_attributes,
            relations=_relations
        ))
        
    def generateMany2Many(self, table, columns):
        if columns.get('_relation') == None:
            return None
        
        models = []
        for field, relation in columns['_relation'].iteritems():
            if not self._analyze(relation):
                raise SchemaException('%s table has an invalid _relation section, please fix it!!!' % ( table ))        
        
            t = self._mgr.getSysDomain().get_template('tpl/modelrelation.evoque')
            modelSuffix = ''.join([ word.capitalize() for word in table.split('_') ])
            modelPreffix = ''.join([ word.capitalize() for word in relation['foreignTable'].split('_') ])
            modelName = modelSuffix + modelPreffix        
            _model_primary_keys = self._generatePrimaryKeys(relation['keys'])
            _attributes = []
            for key in relation['keys']:
                attrName = key if type(key) == str else key.keys()[0]
                attrType = 'Int()'
                _attributes.append((attrName, attrType)) 
            if relation.get('fields') != None:
                for field in relation['fields']:
                    for fname, fvalue in field.iteritems():
                        attrName = fname
                        attrType = self._parseColumn(fvalue, True)
                        _attributes.append((attrName, attrType))
            
            models.append((modelName, t.evoque(
                model_name=modelName,
                model_creation_date=datetime.now(),
                model_file='application/model/relation/{0}'.format( modelName ),
                model_table='{0}'.format( table+'_'+relation['foreignTable'] ),
                model_primary_keys=_model_primary_keys,
                attributes=_attributes
            )))        
        
        return models       

    def _generateModelName(self, table):
        return ''.join([ word.capitalize() for word in table.split('_') ])

    def _checkComposedKeys(self, cols):
        keys = []         
        for name, col in cols.iteritems():            
            if col in ['_relation', '_config', '_indexes']: continue
            if 'primaryKey' in col:
                keys.append(name)        
        if len(keys) > 1:
            return self._generatePrimaryKeys(keys)
        
        return ''
        
    def _generatePrimaryKeys(self, keys):        
        _new_keys = []
        for key in keys:
            if type(key) == str: _new_keys.append(key)
            elif type(key) == dict: _new_keys.append(key.keys()[0])
        
        return '__storm_primary__ = '+','.join([ '"'+k+'"' for k in _new_keys ])
    
    def writeBaseModel(self, modName, tpl):
        fp = file('application/model/base/{0}Base.py'.format(modName), 'w')        
        fp.write(tpl.encode('utf8'))
        fp.close()
    
    def writeModel(self, modName, tpl):
        fp = file('application/model/{0}.py'.format(modName), 'w')
        fp.write(tpl.encode('utf8'))
        fp.close()
    
    def writeRelation(self, modName, tpl):
        fp = file('application/model/relation/{0}.py'.format(modName), 'w')
        fp.write(tpl.encode('utf8'))
        fp.close()
        
    def _analyze(self, config):
        """Analyzes a table _config section"""                    
        if config.get('type') == None or config.get('foreignTable') == None:
            return False        
        
        return True
    
    def _parseColumn(self, col, special=False):        
        _primary = 'False'
        _allow_none = 'True'
        _default_value = 'Undef'
        _foreign_keys = False        
        if col.get('type') != None:            
            if col.get('primaryKey') != None and col.get('primaryKey') == True:                
                _primary = 'True'
            if col.get('required') != None and col.get('required') == True:
                _allow_none = 'False'
            if col.get('default') != None:
                _default_value = col.get('default')            
            
            if not special:
                return '{0}(primary={1}, value={2}, allow_none={3})'.format(tr(col.get('type')), _primary, _default_value, _allow_none)
            else:
                return '{0}(value={1}, allow_none={2})'.format(tr(col.get('type')), _default_value, _allow_none)
            