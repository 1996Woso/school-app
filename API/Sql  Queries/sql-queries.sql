Use school_app

--Add Computed FullName column
Alter Table Students
Add FullName As (
	Ltrim(Rtrim(
		FirstName +
		Case
			When SecondName Is Null Or LTrim(Trim(SecondName)) = '' Then ''
			Else ' ' + SecondName
		End +
		' ' + LastName
	)) 
) Persisted;
--
CREATE NONCLUSTERED INDEX IX_Students_FullName
ON Students (FullName)
