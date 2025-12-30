DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Payment_Tab_Details`( In Student_Id_ Int)
Begin 
 SELECT 
Payment_Tab_Id , 
Student_Id , 
(Date_Format(Date,'%Y-%m-%d')) As Date, 
(Date_Format(payment_tab_details.Entry_Date,'%Y-%m-%d')) As Entry_Date,
(Date_Format(Date,'%d-%m-%Y')) As Date1, 
(Date_Format(payment_tab_details.Entry_Date,'%d-%m-%Y')) As Entry_Date1,
Voucher_No ,
From_Account_Id ,
client_accounts.Client_Accounts_Name AS From_Accounts, 
To_Account_Id , ToAccount,
#to_a.Client_Accounts_Name as To_Account,
Amount ,
Description , 
Journel_Entry_Id , 
User_Id,
Payment_Voucher_Id 
From payment_tab_details 
inner join client_accounts on client_accounts.Client_Accounts_Id=payment_tab_details.From_Account_Id
#inner join client_accounts as to_a on to_a.Client_Accounts_Id=payment_tab_details.To_Account_Id 
where Student_Id =Student_Id_ and payment_tab_details.DeleteStatus=false ;
 End$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Save_Payment_Voucher`( In Payment_Voucher_Id_ decimal(18,0),
Date_ datetime,From_Account_Id_ DECIMAL(18,0),Amount_ DECIMAL(18,2),To_Account_Id_ DECIMAL(18,0),
Payment_Mode_ DECIMAL(18,0),User_Id_ DECIMAL(18,0),Payment_Status_ int,Description_ varchar(1000),
Student_Id_ int,Master_Id_ int,Status_ int)
Begin

declare Voucher_No_ decimal(18,0);
declare Accounts_Id_ DECIMAL(18,0);
declare YearFrom datetime;
declare YearTo datetime;
DECLARE Check_Box_ varchar(25);
declare Discount_ decimal(18,2);
declare Paying_Amount_ DECIMAL(18,2);
declare Purchase_Master_Id_ int;
DECLARE i int  DEFAULT 0;


/*** Year Setting & Voucher No. Setting ***/

set YearFrom=(select Account_Years.YearFrom from Account_Years
	where  Date_Format(Date_,'%Y-%m-%d') between Date_Format(Account_Years.YearFrom,'%Y-%m-%d') and
		Date_Format(Account_Years.YearTo,'%Y-%m-%d'));
        
set YearTo=(select Account_Years.YearTo from Account_Years
	where Date_Format(Date_,'%Y-%m-%d') between Date_Format(Account_Years.YearFrom,'%Y-%m-%d') and
		Date_Format(Account_Years.YearTo,'%Y-%m-%d'));
        
if exists(select distinct Voucher_No from Payment_Voucher)
then
	set Voucher_No_=(SELECT  COALESCE( MAX(Voucher_No ),0)+1 FROM Payment_Voucher
	where Date_Format(Date,'%Y-%m-%d') between Date_Format(YearFrom,'%Y-%m-%d') and
	 Date_Format(YearTo,'%Y-%m-%d') and DeleteStatus=false);  
else
	if exists(select Payment_Voucher_No from General_Settings)
		then
		set Voucher_No_=(select COALESCE(Payment_Voucher_No,0) from General_Settings);
	else
		set Voucher_No_=1;
	end if;    
end if;


/**********/

if  Payment_Voucher_Id_>0
 THEN
	set Voucher_No_=(select Voucher_No from Payment_Voucher Where Payment_Voucher_Id=Payment_Voucher_Id_);
	DELETE FROM Accounts WHERE Tran_Type='PV' AND Tran_Id=Payment_Voucher_Id_;

	UPDATE Payment_Voucher set 
					Date = Date_,
                    From_Account_Id = From_Account_Id_ ,
                    Amount = Amount_ ,
                    To_Account_Id = To_Account_Id_ ,
                    Payment_Mode = Payment_Mode_ ,
                    User_Id = User_Id_ ,
					Payment_Status=Payment_Status_,
                    Description=Description_,
                    Student_Id=Student_Id_
				Where 
					Payment_Voucher_Id=Payment_Voucher_Id_ ;
ELSE
	SET Payment_Voucher_Id_ = (SELECT  COALESCE( MAX(Payment_Voucher_Id ),0)+1 FROM Payment_Voucher);
    
	INSERT INTO Payment_Voucher(Payment_Voucher_Id ,Date ,Voucher_No ,From_Account_Id ,Amount ,To_Account_Id , Payment_Mode ,User_Id ,Payment_Status,Description,DeleteStatus,Student_Id )
	values (Payment_Voucher_Id_ ,Date_ ,Voucher_No_ ,From_Account_Id_ ,Amount_ ,To_Account_Id_ ,Payment_Mode_ , User_Id_ ,Payment_Status_,Description_,false,Student_Id_);
End If ;

if(Payment_Voucher_Id_>0)then
	set Accounts_Id_=(select COALESCE( MAX(Accounts_Id ),0)+1 from Accounts);
    
	insert into Accounts(Accounts_Id,Entry_Date,Client_Id,Dr,Cr,
    #X_Client_Id,
    Tran_Type,Tran_Id,Voucher_No,VoucherType,Description1,Status,DayBook,Payment_Status)
	values(Accounts_Id_,Date_,From_Account_Id_,0,Amount_,
    #To_Account_Id_,
    'PV',Payment_Voucher_Id_,Voucher_No_,1,Description_,'','Y',Payment_Status_);
	
    set Accounts_Id_=(select COALESCE( MAX(Accounts_Id ),0)+1 from Accounts);
	
    insert into Accounts(Accounts_Id,Entry_Date,Client_Id,Dr,Cr,
    #X_Client_Id,
    Tran_Type,Tran_Id,Voucher_No,VoucherType,Description1,Status,DayBook,Payment_Status)
	values(Accounts_Id_,Date_,To_Account_Id_,Amount_,0,
    #From_Account_Id_,
    'PV',Payment_Voucher_Id_,Voucher_No_ ,1,Description_,'','Y',Payment_Status_);
end if;

if(Status_=2 ) then
update payment_tab_details set Payment_Voucher_Id=Payment_Voucher_Id_ where Payment_Tab_Id=Master_Id_;
end if;

if(Status_=3 ) then
update payment_commission_tab_details set Payment_Voucher_Id=Payment_Voucher_Id_ where Payment_Commission_Tab_Id=Master_Id_;
end if;


select Payment_Voucher_Id_,Voucher_No_;
End$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Save_Payment_Tab_Details`( In Payment_Tab_Id_ int,
Student_Id_ INT ,Date_ DATE, Voucher_No_ varchar(100) ,From_Account_Id_ INT, To_Account_Id_ INT, ToAccount_ varchar(100),
Amount_ decimal(18,2),Description_ varchar(2000),User_Id_ int,Journel_Entry_Id_ int,Payment_Voucher_Id_ int)
Begin 

declare YearFrom datetime;declare YearTo datetime;

TRUNCATE data_log_;

if Payment_Tab_Id_=0 then

set YearFrom=(select Account_Years.YearFrom from Account_Years
where  Date_Format(Date_,'%Y-%m-%d') between Date_Format(Account_Years.YearFrom,'%Y-%m-%d') and
Date_Format(Account_Years.YearTo,'%Y-%m-%d'));

set YearTo=(select Account_Years.YearTo from Account_Years
 where Date_Format(Date_,'%Y-%m-%d') between Date_Format(Account_Years.YearFrom,'%Y-%m-%d') and
Date_Format(Account_Years.YearTo,'%Y-%m-%d'));

if exists(select distinct Voucher_No from Payment_Voucher)
then
	set Voucher_No_=(SELECT  COALESCE( MAX(Voucher_No ),0)+1 FROM Payment_Voucher
	where Date_Format(Date,'%Y-%m-%d') between Date_Format(YearFrom,'%Y-%m-%d') and
	 Date_Format(YearTo,'%Y-%m-%d') and DeleteStatus=false);  
else
	if exists(select Payment_Voucher_No from General_Settings)
		then
		set Voucher_No_=(select COALESCE(Payment_Voucher_No,0) from General_Settings);
	else
		set Voucher_No_=1;
	end if;    
end if;

else
set Voucher_No_=Voucher_No_;
end if;


 if  Payment_Tab_Id_>0
 THEN 
 
 UPDATE payment_tab_details set Payment_Tab_Id =Payment_Tab_Id_,
Student_Id =Student_Id_,
Date =Date_ ,
Voucher_No =Voucher_No_,
From_Account_Id  =From_Account_Id_,
To_Account_Id  =To_Account_Id_,ToAccount  =ToAccount_,
Amount =Amount_,
Description =Description_ ,
Entry_Date =NOW(),User_Id =User_Id_ Where Payment_Tab_Id =Payment_Tab_Id_ ;

 insert into data_log_ values(0,Payment_Voucher_Id_,'payment voucher id UPDATE');

call `Save_Payment_Voucher`( Payment_Voucher_Id_,Date_,From_Account_Id_,Amount_,To_Account_Id_,1,User_Id_,0,
Description_,Student_Id_,Payment_Tab_Id_,2);


 ELSE 
 
 SET Payment_Tab_Id_ = (SELECT  COALESCE( MAX(Payment_Tab_Id ),0)+1 FROM payment_tab_details); 
 INSERT INTO payment_tab_details(Payment_Tab_Id , Student_Id , Date , Voucher_No , From_Account_Id , 
 To_Account_Id ,ToAccount, Amount , Description ,Entry_Date , DeleteStatus ,User_Id  )
 values ( Payment_Tab_Id_ , Student_Id_ , Date_ , Voucher_No_ , From_Account_Id_ , 
 To_Account_Id_ ,ToAccount_, Amount_ , Description_ ,now() , 0,User_Id_ );


call `Save_Payment_Voucher`( 0,Date_,From_Account_Id_,Amount_,To_Account_Id_,1,User_Id_,0,
Description_,Student_Id_,Payment_Tab_Id_,2);

 End If ;
 
 select Payment_Tab_Id_;
 End$$
DELIMITER ;
