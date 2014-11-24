echo ""
echo "===================================================================="
echo "==                                                                =="
echo "==    WELCOME TO KONSTRUCT.BOILERPLATE INSTALL SCRIPT!            =="
echo "==    --------------------------------------------------------    =="
echo "==    Let's just go ahead & install it for you first shall we?    =="
echo "==                                                                =="
echo "===================================================================="
echo ""

read -p "Is this a brand new project? (Y/N) " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    
    echo "== Step 1: Installing Node Modules..."
    echo ""
    echo "--------------------------------------------------------------------"
    echo ""
    sudo npm install
    
    echo "== Step 2: Installing Bower Dependencies..."
    echo ""
    echo "--------------------------------------------------------------------"
    echo ""
    bower install
    
    echo "== Step 3: Installing Konstruct..."
    echo ""
    echo "--------------------------------------------------------------------"
    echo ""
    gulp install-css
    
    echo "== Step 4: Installing Javascript Components..."
    echo ""
    echo "--------------------------------------------------------------------"
    echo ""
    gulp install-js
    
    echo "== Step 5: Preparing Javascript Components..."
    echo ""
    echo "--------------------------------------------------------------------"
    echo ""
    gulp prepare-js
    
    echo ""
    echo " == THANKS FOR INSTALLING KONSTRUCT! =="
    echo ""
    
else

    echo ""
    echo "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    echo "XX                                                                XX"
    echo "XX    PLEASE RUN './UPDATE.SH'                                    XX"
    echo "XX    --------------------------------------------------------    XX"
    echo "XX    Please run the update.sh script instead of the install      XX"
    echo "XX    script. You will override everything you've done so far.    XX"
    echo "XX                                                                XX"
    echo "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    echo ""
    
fi

