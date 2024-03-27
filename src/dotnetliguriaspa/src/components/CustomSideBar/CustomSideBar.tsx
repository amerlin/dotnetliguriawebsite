import React, { FC } from 'react';
import {Box,Divider,Link,List,ListItem,Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {Link as RouterLink} from "react-router-dom";
const CustomSideBar: FC = () => { return(
    <>
    <Box component={"div"} pl={2} mr={5}>
        <Typography>Dashboard</Typography>
        <Divider sx={{"padding-bottom": "10px"}}></Divider>
        <List>
            <ListItem><Box display={"flex"} alignItems={"center"}><HomeIcon/><Link pl={1} component={RouterLink} to="/" underline="none"><Typography fontSize={ 12 }>HOME</Typography></Link></Box></ListItem>
            <ListItem><Box display={"flex"} alignItems={"center"}><FeedIcon/><Link pl={1} component={RouterLink} to="/admin/profile/" underline="none"><Typography fontSize={ 12 }>PROFILO</Typography></Link></Box></ListItem>
            <ListItem><Box display={"flex"} alignItems={"center"}><PersonIcon/><Link pl={1} component={RouterLink} to="/admin/speakers/" underline="none"><Typography fontSize={ 12 }>SPEAKERS</Typography></Link></Box></ListItem>
            <ListItem><Box display={"flex"} alignItems={"center"}><EventNoteIcon/><Link pl={1} component={RouterLink} to="/admin/events/" underline="none"><Typography fontSize={ 12 }>EVENTS</Typography></Link></Box></ListItem>
            <ListItem><Box display={"flex"} alignItems={"center"}><QuestionAnswerIcon/><Link pl={1} component={RouterLink} to="/admin/feedbacks/" underline="none"><Typography fontSize={ 12 }>FEEDBACKS</Typography></Link></Box></ListItem>
            <ListItem><Box display={"flex"} alignItems={"center"}><QuestionAnswerIcon/><Link pl={1} component={RouterLink} to="/admin/download/" underline="none"><Typography fontSize={ 12 }>DOWNLOADS</Typography></Link></Box></ListItem>
            <Divider></Divider>
        </List>
    </Box>
    </>    
)};

export default CustomSideBar;
