El modulo <ExpedientesDataGrid> pude hacerlo andar con modo de Pagina="client", 
leo todos los registros de Expedientes (consulta que filtra x estado="Estudio")
y pagino en modo cliente. No pude hacerlo andar en modo servidor, no me funciionaba.

el modulo <RegisterPage> usa el hook Formu (que está bueno)

pero el modulo <ExpedientesCarga> no usa hook, es mas complejo (lo hice primero) y ademas tiene muchos campos de lista y cuando selecciona "otro" de la lista , permite una función onchange que agregra un elemento nuevo a esa colección