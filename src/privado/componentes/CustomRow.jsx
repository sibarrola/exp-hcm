/* AL FINAL NO USE ESTE, LO DEJO COMO EJEMPLO */

const CustomRow= (props)=> {
    return (
        <div
            {...props}
            sx={{
                ...props.sx,
                '&.selected-row': {
                    backgroundColor: 'green', // remplaza 'tuColorElegido' por el color que quieras
                }
            }}
        />
    );
}
 export default CustomRow;
