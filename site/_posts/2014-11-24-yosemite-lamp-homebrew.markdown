---
layout: post
title:  "LAMP Stack on Mac OS X Yosemite using homebrew"
date:   2014-11-24 08:39:32
categories: How-to
---

<h2>Step 1: install homebrew</h2>
<p>run the following command in terminal</p>

<p class="you-type">
    
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

</p>

<p>once that has completed, run the following commands in terminal</p>
<p><span class="you-type">brew doctor</span></p>
<p>Fix any errors. ( DO NOT SKIP THIS PART! )</p>
<p><span class="you-type">brew update</span></p>

<h2>Step 2: daemons</h2>
<p>Install lunchy (for starting and stopping daemons)</p>
<p><span class="you-type">sudo gem install lunchy</span></p>
<h3>a side note about daemons</h3>
<p>Mac OS X relies on launchctl to start and stop services. It is similar to init.d in linux, or service in Ubuntu. lunchy is a wrapper for launchctl. It makes it easier to start and stop services. Services that are owned by root have init scripts in /Library/LaunchDaemons. To start and stop these services using lunchy, you must use sudo. Services owned by the user have init scripts in ~/Library/LaunchAgents/. Lunchy does not require sudo to start and stop these services.</p>

<h2>Step 3: PHP</h2>
<p><span class="you-type">brew tap homebrew/dupes</span></p>
<p><span class="you-type">brew tap josegonzalez/homebrew-php</span></p>
<section class="warning">
    <h3>!!!!! NB !!!!!</h3>
    <p>please note the version of PHP you are installing. For this document, we will use an X which you need to change to the version you have chosen to install</p>
    <h3>!!!!! NB !!!!!</h3>
</section>
<p><span class="you-type">brew install php5<b class="red">X</b></span></p>
<p>Install useful PHP extensions (using brew)</p>
<p><span class="you-type">brew install php5<b class="red">X</b>-xdebug</span></p>


<h2>Step 4: MySQL (MariaDB)</h2>
<p>MariaDB is an optimized fork of MySQL. It works great as a drop-in replacement for the standard version of MySQL. If you would rather not use MariaDB you can do all of these same steps, just replace the word mariadb with the word mysql.</p>
<p><span class="you-type">brew install mariadb</span></p>

<p>the following commands you just copy and paste and they make it work</p>
<p><span class="you-type">cp $(brew --prefix mariadb)/support-files/my-large.cnf /usr/local/etc/my.cnf</span></p>
<p><span class="you-type">sed -i "" 's/max_allowed_packet = 1.*M/max_allowed_packet = 32M/g' /usr/local/etc/my.cnf</span></p>
<p><span class="you-type">cp /usr/local/opt/mariadb/homebrew.mxcl.mariadb.plist ~/Library/LaunchAgents/</span></p>
<p><span class="you-type">mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mariadb)" --datadir=/usr/local/var/mysql --tmpdir=/tmp</span></p>
<p><span class="you-type">launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mariadb.plist</span></p>

<section class="warning">
    <h3>!!!!! NB !!!!!</h3>
    <p>replace the <b class="red">XXX</b> below with the password you want to use as your root password for MySQL</p>
    <h3>!!!!! NB !!!!!</h3>
</section>

<p><span class="you-type">mysqladmin -uroot password '<b class="red">XXX</b>'</span></p>

<h3>linking php and mysql</h3>
<p>a fix to enable php and mysql to get along ...</p>
<p><span class="you-type">sudo mkdir /var/mysql</span></p>
<p><span class="you-type">sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock</span></p>

<h2>Step 5: Apache</h2>
<p>OK, so here is where things get all crazy!!! The previous 4 steps were pretty straight forward, and if you followed them, closely, you should see a nice "It works" when you browse to "http://localhost" in your browser. the next steps will allow you to browse to sites in your defined sites folder, which we will call "Sites"</p>

<p>You need to make a "Sites" folder at the root level of your account and then it will work. Once you make the Sites folder you will notice that it has a unique icon which is a throwback from a few versions older. Make that folder before you set up the user configuration file described next.</p>

<section class="warning">
    <h3>!!!!! NB !!!!!</h3>
    <p>replace the <b class="red">username</b> below with your pc user name.</p>
    <p>replace the <b class="red">XXX</b> below with any server name.</p>
    <h3>!!!!! NB !!!!!</h3>
</section>

<p><span class="you-type">sudo touch /etc/apache2/users/<b class="red">username</b>.conf</span></p>
<p><span class="you-type">sudo nano /etc/apache2/users/<b class="red">username</b>.conf</span></p>

<pre>
<code class="apache">
    <span class="tag"><span class="tag">&lt;VirtualHost *:80&gt;</span></span>
        <span class="keyword"><span class="keyword">ServerName</span></span> <b class="red">XXX</b>
        <span class="keyword"><span class="keyword">DocumentRoot</span></span> /Users/<b class="red">username</b>/Sites
        <span class="keyword"><span class="keyword">VirtualDocumentRoot</span></span> /Users/<b class="red">username</b>/Sites
        <span class="keyword"><span class="keyword">UseCanonicalName</span></span> <span class="literal"><span class="literal">Off</span></span>

        <span class="tag"><span class="tag">&lt;Directory "/Users/<b class="red">username</b>/Sites"&gt;</span></span>
            <span class="keyword"><span class="keyword">AllowOverride</span></span> All
            <span class="keyword"><span class="keyword">Options</span></span> Indexes MultiViews
            <span class="keyword"><span class="keyword">Options</span></span> +FollowSymLinks
            <span class="keyword"><span class="keyword">Require</span></span> all granted
        <span class="tag"><span class="tag">&lt;/Directory&gt;</span></span>
    <span class="tag"><span class="tag">&lt;/VirtualHost&gt;</span></span>
</code>
</pre>


<p>Next you need to edit some files ... this is where Yosemite differs from previous setups. In terminal, edit your httpd.conf file and uncomment the entries as indicated below. In nano, you can search for these by pressing "CTRL" + "w"</p>
<p><span class="you-type">sudo nano /etc/apache2/httpd.conf</span></p>
<p>LoadModule authz_core_module libexec/apache2/mod_authz_core.so</p>
<p>LoadModule authz_host_module libexec/apache2/mod_authz_host.so</p>
<p>LoadModule userdir_module libexec/apache2/mod_userdir.so</p>
<p>LoadModule rewrite_module libexec/apache2/mod_rewrite.so</p>
<p>LoadModule php5_module libexec/apache2/libphp5.so</p>
<p>also, further down ...</p>
<p>Include /private/etc/apache2/extra/httpd-vhosts.conf</p>
<p>Include /private/etc/apache2/extra/httpd-userdir.conf</p>

<pre>
    <code class="apache">
        <span class="tag"><span class="tag">MultiviewsMatch Any</span></span>
        
        <span class="tag"><span class="tag">#</span></span>
        <span class="keyword"><span class="keyword">#</span></span> AllowOverride controls what directives may be placed in .htaccess files.
        <span class="keyword"><span class="keyword">#</span></span> It can be "All", "None", or any combination of the keywords:
        <span class="keyword"><span class="keyword">#</span></span> AllowOverride FileInfo AuthConfig Limit
        <span class="keyword"><span class="keyword">#</span></span>
        
        <span class="literal"><span class="literal">AllowOverride All</span></span>

        <span class="keyword"><span class="keyword">#</span></span>
        <span class="keyword"><span class="keyword">#</span></span> Controls who can get stuff from this server.
        <span class="keyword"><span class="keyword">#</span></span>
    </code>
</pre>

<p>Save your conf file by pressing "CTRL" + "x", then "y", then "ENTER"</p>
<p>next, we edit the http-vhosts.conf file</p>
<p><span class="you-type">sudo nano /etc/apache2/extra/httpd-vhosts.conf</span></p>

<pre>
    <code class="apache">
    <span class="tag"><span class="tag">&lt;VirtualHost *:80&gt;</span></span>
        <span class="keyword"><span class="keyword">ServerName</span></span> <b class="red">XXX</b>
        <span class="keyword"><span class="keyword">VirtualDocumentRoot</span></span> "/Users/<b class="red">username</b>/Sites"
        <span class="keyword"><span class="keyword">UseCanonicalName</span></span> <span class="literal"><span class="literal">Off</span></span>
    <span class="tag"><span class="tag">&lt;/VirtualHost&gt;</span></span>
    </code>
</pre>

<h5>References</h5>

<ul>
    
    <li>http://www.astonishdesign.com/blog/native-lamp-stack-mac-os-x</li>
    <li>http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/</li>
    <li>http://coolestguidesontheplanet.com/set-virtual-hosts-apache-mac-osx-10-9-mavericks-osx-10-8-mountain-lion/</li>

</ul>