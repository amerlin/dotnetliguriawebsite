import React, { FC } from 'react';
import {Box,Divider,Link,List,ListItem,Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EventNoteIcon from '@mui/icons-material/EventNote';
const CustomSideBar: FC = () => { return(
    <>
    <Box component={"div"} pl={2} mr={5}>
        <Typography>Dashboard</Typography>
        <Divider sx={{"padding-bottom": "10px"}}></Divider>
        <List>
            <ListItem><Box display={"flex"} alignItems={"center"}><HomeIcon/><Link  pl={1} href="/" underline="none"><Typography fontSize={ 12 }>HOME</Typography></Link></Box></ListItem>
            <ListItem><Box display={"flex"} alignItems={"center"}><FeedIcon/><Link  pl={1} href="/admin/profile/" underline="none"><Typography fontSize={ 12 }>PROFILO</Typography></Link></Box></ListItem>
                <ListItem><Box display={"flex"} alignItems={"center"}><PersonIcon/><Link pl={1} href="/admin/speakers/" underline="none"><Typography fontSize={ 12 }>SPEAKERS</Typography></Link></Box></ListItem>
                <ListItem><Box display={"flex"} alignItems={"center"}><EventNoteIcon/><Link pl={1} href="/admin/events/" underline="none"><Typography fontSize={ 12 }>EVENTS</Typography></Link></Box></ListItem>
                <ListItem><Box display={"flex"} alignItems={"center"}><QuestionAnswerIcon/><Link pl={1} href="/admin/feedbacks/" underline="none"><Typography fontSize={ 12 }>FEEDBACKS</Typography></Link></Box></ListItem>
            <Divider></Divider>
        </List>
    </Box>
    </>    
)};

export default CustomSideBar;
