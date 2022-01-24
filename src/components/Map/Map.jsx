import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutLinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';

import useStyles from './styles'


const Map = () =>{
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

  const coordinates = {lat:0, lng:0};


  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
        bootstrapURLKeys={{key:'AIzaSyDRAG8A4XvDDMIUsUAnzwawrlWveB6eNY0'}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom = {14}
        margin={[50,50,50,50]}
        options={''}
        onChange={''}
        onChildClick={''}
        >

        </GoogleMapReact>
    </div>
  );
}

export default Map;