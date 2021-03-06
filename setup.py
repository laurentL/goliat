#!/usr/bin/env python
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the (LGPL) GNU Lesser General Public License as
# published by the Free Software Foundation; either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Library Lesser General Public License for more details at
# ( http://www.gnu.org/licenses/lgpl.html ).
#
# You should have received a copy of the GNU Lesser General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
# written by: Oscar Campos ( oscar.campos@open-phoenix.com )

#from setuptools import setup, find_packages
import setuptools
import os, sys

if not hasattr(sys, "version_info") or sys.version_info<(2, 6):
    raise RuntimeError("Goliat requires Python 2.6 or later.")

sys.path.insert(0, './src')

try:
    import goliat.cli.utils.linux as linux
except:
    pass
from goliat.cli import userquery

static_types=[
    '*.js',
    '*.html',
    '*.css',
    '*.png',
    '*.jpg',
    '*.gif',
    '*.ico',
    '*.txt*',
    '*.py',
    '*.evoque'
]

def main(args):
    def check_storm_twisted():
        try:
            import storm.twisted
        except ImportError:
            prompt='Storm Twisted branch is required to use the deferred stores from Storm ORM\n'+\
            'Goliat can work with the regular Storm libraries but using the Twisted branch (at this\n'+\
            'moment waiting for merge to the official branch) should offer a high performance.\n'+\
            'NOTE: You need the Bazaar bzrlibs installed in your system to get the branch.\n\n'+\
            'Would you like to install the twisted branch from storm bazaar repository? (recommended)'
            if userquery(prompt)=="Yes":
                try:
                    from bzrlib import bzrdir, errors
                    accelerator_tree, source=bzrdir.BzrDir.open_tree_or_branch('http://bazaar.launchpad.net/~therve/storm/twisted-integration')
                    try:
                        print 'The installation script is donwloading the Bazaar repository...'
                        source.create_checkout('./twisted-storm', None, True, accelerator_tree)
                    except errors.FileExists:
                        pass
                    currdir=os.getcwd()
                    os.chdir('twisted-storm')
                    from subprocess import Popen, PIPE
                    p=Popen('python2.6 setup.py {0}'.format(args[0]).split(' '), stdout=PIPE, stderr=PIPE)
                    print '\n{0}ing Storm with twisted-integration\n'.format(args[0].capitalize())
                    ret=p.communicate()
                    if len(ret[1]):
                        print ret[1]
                        print '\nQuitting.'
                        sys.exit(1)
                    print ret[0]
                    print '\nContinue.\n'
                    os.chdir(currdir)
                except ImportError:
                    prompt='You answered \'Yes\' previosly but the bzrlib is not present in your system.\n'+\
                    'This script needs Bazaar Bzrlib to get the twisted-storm branch from the launchpad brazaar'+\
                    'repository.\n\n'+\
                    'Would you like return to the system and install he Brzlibs with your package manager?'
                    if userquery(prompt)=="Yes":
                        sys.exit(1)
                    print 'The twisted support will not be available in your Goliat Resource objects...\n\n'

    def check_evoque_qpy():
        try:
            import evoque
        except ImportError:
            prompt='Goliat uses evoque as template engine.\n\n'+\
            'Would you like to install evoque now?'
            if userquery(prompt)=="Yes":

                currdir=os.getcwd()
                os.chdir('evoque-0.4')
                from subprocess import Popen, PIPE
                p=Popen('python2.6 setup.py {0}'.format(args[0]).split(' '), stdout=PIPE, stderr=PIPE)
                print '\n{0}ing Goliat Evoque\n'.format(args[0].capitalize())
                ret=p.communicate()
                if len(ret[1]):
                    print ret[1]
                    print '\nQuitting.'
                    sys.exit(1)
                print ret[0]
                print '\nContinue.\n'
                os.chdir(currdir)
                #from setuptools.command.easy_install import main
                #main(['evoque'])
                #print '\nContinue.\n'
        try:
            import qpy
        except ImportError:
            prompt='Goliat uses qpy with evoque.\n\n'+\
            'Would you like to install qpy now?'
            if userquery(prompt)=="Yes":
                from setuptools.command.easy_install import main
                main(['qpy'])
                print '\nContinue.\n'

    def get_package_data():
        ret=[]
        for t in reduce(list.__add__, [
            '.git' not in d and [ os.path.join(d[len('src/goliat')+1:], e) for e in static_types ] or [] for (d, s, f) in os.walk(os.path.join('src/goliat', 'evoque'))
        ]):
            ret.append(t)
        for t in reduce(list.__add__, [
            '.git' not in d and [ os.path.join(d[len('src/goliat')+1:], e) for e in static_types ] or [] for (d, s, f) in os.walk(os.path.join('src/goliat', 'static'))
        ]):
            ret.append(t)
        for t in reduce(list.__add__, [
            '.git' not in d and [ os.path.join(d[len('src/goliat')+1:], e) for e in static_types ] or [] for (d, s, f) in os.walk(os.path.join('src/goliat', 'web'))
        ]):
            ret.append(t)
        return ret



    check_storm_twisted()
    check_evoque_qpy()

    setuptools.setup(
        name="Goliat",
        version='0.1.1',
        description="Goliat Web Applications Framework.",
        author="Open Phoenix IT S.Coop.And",
        author_email="goliat@open-phoenix.com",
        maintainer="Oscar Campos Ruiz",
        maintainer_email="oscar.campos@open-phoenix.com",
        packages=setuptools.find_packages('src', exclude=['tests', 'storm-twisted']),
        package_dir={'goliat': 'src/goliat'},
        package_data={
            'goliat': get_package_data()
        },
        url='http://goliat.open-phoenix.com',
        license='GPLv2 License',
        install_requires=['twisted >= 10.0.0', 'evoque >= 0.4', 'qpy', 'storm >= 0.15', 'pyyaml >= 3.08'],
        requires=['twisted(>=10.0.0)', 'evoque(>=0.4)', 'qpy', 'storm(>=0.15)', 'pyyaml(>=3.08)'],
        scripts=['src/goliat-mgr'],
        zip_safe=False,
        classifiers=[
            'Development Status :: 4 - Beta',
            'Environment :: Console',
            'Environment :: Web Environment',
            'Intended Audience :: Developers',
            'Intended Audience :: System Administrators',
            'License :: OSI Approved :: GPLv2 License',
            'Operating System :: POSIX',
            'Programming Language :: Python',
            'Topic :: Software Development :: Libraries :: Web Services :: Python Modules'
        ]
    )

if __name__=="__main__":
    try:
        main(sys.argv[1:])
    except KeyboardInterrupt:
        sys.exit(1)
