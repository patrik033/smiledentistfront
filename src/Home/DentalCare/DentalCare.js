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
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import image from "./../../img/no-profile-picture.png";


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

function DentalCare(props) {

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    return (
        <div>
            <div>
                <Cards sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {props.treatmentName.substr(0, 1)}
                                {props.treatmentName.substr(1, 1)}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={`${props.treatmentName}`}
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
                            <h2>
                                Typ Av Vård:
                            </h2>
                            {props.treatmentName}
                        </Typography>
                       <Typography>
                       {props.treatmentPrice.toLocaleString("sv-SE",{style:"currency",currency:"SEK"})}
                       </Typography>

                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
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
                                {props.treatmentInformation}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Cards>
            </div>
        </div>
    )
}

export default DentalCare;