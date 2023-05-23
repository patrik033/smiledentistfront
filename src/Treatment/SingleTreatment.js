/* eslint-disable no-unused-vars */

import { styled } from '@mui/material/styles';
import Cards from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import image from "./../img/no-profile-picture.png";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function SingleTreatment(props) {

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [modalShow, setModalShow] = useState(false);
    return (
        <div>
            <div>
                <Cards sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {props.treatmentname.substr(0, 1)}
                                {props.treatmentname.substr(1, 1)}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={`${props.treatmentname}`}
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="150"

                        image={image}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <h5>
                            Typ Av Vård: {props.treatmentname}
                            </h5>
                        </Typography>


                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <Typography>
                            {props.treatmentprice.toLocaleString("sv-SE", { style: "currency", currency: "SEK" })}
                        </Typography>
                    </CardActions>
                    <CardActions>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>

                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {props.treatmentinformation}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Cards>
            </div>
        </div>
    );
}

export default SingleTreatment;