import { useEffect, useState } from 'react';
import { formatearFecha } from '../../helpers/funcionesVarias'
import React from 'react'
import { Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import { PropTypes } from "prop-types";
import logo1 from  '../../assets/logo-160px.fw.png'
const ExpedientePdf = ({ expediente, pasesOrdenados }) => {

    const styles = StyleSheet.create({
        pageContent: {
            paddingTop: 20,  // Esto añadirá un padding de 20 a todo el contenido
            paddingLeft:50,
            paddingRight:20,
            paddingBottom:20
        },
        logo: {
            width: 50,     // puedes ajustar el ancho según necesites
            height: 50,    // puedes ajustar la altura según necesites
            marginBottom: 10  // Espacio por debajo del logo antes del título
          },
        title: {
            fontSize: 16,  // Tamaño de fuente
            textAlign: 'center',  // Alinear al centro
            marginBottom: 10  // Margen inferior
        },
        title1: {
            fontSize: 10,  // Tamaño de fuente
            textAlign: 'left',  // Alinear al centro
            marginLeft: 10  // Margen inferior
        },
        title2: {
            fontSize: 8,  // Tamaño de fuente
            textAlign: 'left',  // Alinear al centro
            marginLeft: 2  // Margen inferior
        },
        subtitle: {
            fontSize: 12,
            marginBottom: 5
        },
        subtitle1: {
            fontSize: 12,
            fontWeight: 500,
            marginBottom: 5
        },
        regularText: {
            fontSize: 12
        },
        /* para hacer una linea */
        line: {
            borderBottomColor: '#000000',  // Color de la línea.
            borderBottomWidth: 1,          // Grosor de la línea.
            marginBottom: 10,              // Espacio inferior (opcional).
            marginTop: 10                  // Espacio superior (opcional).
        },
/* para hacer dos formatos en la misma linea */
        inlineTextContainer: {
            flexDirection: 'row',  // Esto alinea los elementos hijos en horizontal
            alignItems: 'baseline'  // Alinea verticalmente por la línea base del texto
        },
        inlineTextContainer2: {
            flexDirection: 'row',   
            alignItems: 'baseline' ,
            justifyContent:'center'  
        },
        labelText: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 5
        },
        valueText: {
            fontSize: 10,
            marginLeft: 5 ,
            marginBottom: 5   
        },
        /* aqui los estilos de las tablas */
        table: {
            display: 'table',
            width: '90%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0
        },
        tableRow: {
            margin: 'auto',
            flexDirection: 'row'
        },
        tableColHeader0: {
            width: '40%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            backgroundColor: '#E4E4E4'
        },
        tableColHeader: {
            width: '20%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            backgroundColor: '#E4E4E4'
        },
        tableCol0: {
            width: '40%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0
        },
        tableCol: {
            width: '20%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
         
            
        },
        tableCellHeader: {
            margin: 'auto',
            fontSize: 12,
            fontWeight: 'bold'
        },
        tableCell: {
          /*   margin: 'auto', */
            fontSize: 10,
            textAlign:'left',
            paddingLeft:'10px'
        }
    });

    return (
        <Document>
            <Page size='A4'>
                <View style={styles.pageContent}  >
                    
                   <View style={styles.inlineTextContainer}>

                   <Image
                        style={styles.logo}
                        src={logo1}
                    />
                     <Text style={styles.title2}>
                       HCM S.J.del Rincón
                    </Text>
                    
                   </View>
                   <View style={styles.line} />
                   <View style={{ height: 20 }}/>
                   <Text style={styles.title}>
                        VISUALIZACION DEL EXPEDIENTE
                    </Text>
                   
                 <View style={styles.inlineTextContainer2}  >
                        <Text style={styles.labelText}>Legajo:</Text>
                        <Text style={styles.valueText}> {expediente.legajo} - Ingresado: {formatearFecha(new Date(expediente.fechaIngreso)) + "-- (" + expediente.estadoExp + ")"}
                         </Text>
                    </View>
                    <View style={{ height: 25 }}/>
                    <View style={styles.inlineTextContainer}>
                        <Text style={styles.labelText}>Motivo:</Text>
                        <Text style={styles.valueText}> {expediente.motivo}</Text>
                    </View>

                    <View style={styles.inlineTextContainer}>
                        <Text style={styles.labelText}>Solicitante:</Text>
                        <Text style={styles.valueText}> {expediente.solicitante}</Text>
                    </View>


                    <View style={styles.inlineTextContainer}>
                        <Text style={styles.labelText}>Presentó:</Text>
                        <Text style={styles.valueText}> {expediente.nombres} {expediente.apellido + "  "} / {expediente.dni ? "DNI:" + expediente.dni : ""} {expediente.celular ? "/ Cel.:" + expediente.celular : ""}    {expediente.domicilio ? "/ Domicilio:" + expediente.domicilio : ""}</Text>
                    </View>
                    <View style={{ height: 20 }}/>
                    <Text style={styles.subtitle}>
                        PASES DEL EXPEDIENTE
                    </Text>
                   
                    {/* la librería no maneja tablas, por eso esta forma............. */}
                    <View style={styles.table}>
                        {/* Row for table headers */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Fecha Pase</Text>
                            </View>
                            <View style={styles.tableColHeader0}>
                                <Text style={styles.tableCellHeader}>Pase a</Text>
                            </View>

                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Comentario</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Permanencia</Text>
                            </View>
                        </View>

                        {/*    TableBody  */}
                        {/* map ---------------------------------------------------- */}
                        {pasesOrdenados.map((pase, index) => {
                            let diasEnEstacion = 0;

                            // Determina  si es la última fila
                            const isLastRow = index === pasesOrdenados.length - 1;
                            /* calculo dias de estación----------------- */
                            if (index < pasesOrdenados.length - 1) {
                                const fechaActual = new Date(pasesOrdenados[index].fecha_pase);
                                const fechaSiguiente = new Date(pasesOrdenados[index + 1].fecha_pase);
                                diasEnEstacion = Math.ceil((fechaSiguiente - fechaActual) / (1000 * 60 * 60 * 24));
                            }
                            return (
                                <View style={styles.tableRow}>
                                    {/*   <TableRow key={pase._id}  > */}
                                    {/* he ajustado las celdas para que queden mas apretadas las filas , no tan altas */}
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{formatearFecha(new Date(pase.fecha_pase))}</Text>
                                    </View>
                                    <View style={styles.tableCol0}>
                                        <Text style={styles.tableCell}>{pase.estacion}  { (pase.sub_estacion)?"-"+pase.sub_estacion:""}  

                                        </Text>
                                    </View>

                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>  {pase.comentario}
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>   {diasEnEstacion !== null ? `${diasEnEstacion} días` : '-'}
                                        </Text>
                                    </View>


                                </View>
                            )
                        })}
                    </View>
                </View>

            </Page >

        </Document >
    )
}

export default ExpedientePdf;




ExpedientePdf.propTypes = {

    expediente: PropTypes.object,
    pasesOrdenados: PropTypes.array
}
