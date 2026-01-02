import React, { FC } from 'react';
import { Box, Divider, Link, List, ListItem, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DownloadIcon from '@mui/icons-material/Download';
import { Link as RouterLink } from "react-router-dom";
const CustomSideBar: FC = () => {
    return (
        <>
            <Box component={"div"} pl={2} mr={5}>
                <Typography sx={{ color: 'black', fontSize: '1.5rem', fontWeight: 600 }}>Dashboard</Typography>
                <Divider sx={{ "padding-bottom": "10px" }}></Divider>
                <List>
                    <ListItem><Box display={"flex"} alignItems={"center"}><HomeIcon sx={{ color: 'black' }} /><Link pl={1} href="/" target="_blank" rel="noopener noreferrer" underline="none"><Typography fontSize={16} sx={{ color: 'black' }}>HOME</Typography></Link></Box></ListItem>
                    <ListItem><Box display={"flex"} alignItems={"center"}><FeedIcon sx={{ color: 'black' }} /><Link pl={1} component={RouterLink} to="/admin/profile/" underline="none"><Typography fontSize={16} sx={{ color: 'black' }}>PROFILE</Typography></Link></Box></ListItem>
                    <ListItem><Box display={"flex"} alignItems={"center"}><GroupsIcon sx={{ color: 'black' }} /><Link pl={1} component={RouterLink} to="/admin/board/" underline="none"><Typography fontSize={16} sx={{ color: 'black' }}>BOARD</Typography></Link></Box></ListItem>
                    <ListItem><Box display={"flex"} alignItems={"center"}><PersonIcon sx={{ color: 'black' }} /><Link pl={1} component={RouterLink} to="/admin/speakers/" underline="none"><Typography fontSize={16} sx={{ color: 'black' }}>SPEAKERS</Typography></Link></Box></ListItem>
                    <ListItem><Box display={"flex"} alignItems={"center"}><EventNoteIcon sx={{ color: 'black' }} /><Link pl={1} component={RouterLink} to="/admin/workshops/" underline="none"><Typography fontSize={16} sx={{ color: 'black' }}>WORKSHOPS</Typography></Link></Box></ListItem>
                    <ListItem><Box display={"flex"} alignItems={"center"}><QuestionAnswerIcon sx={{ color: 'black' }} /><Link pl={1} component={RouterLink} to="/admin/feedbacks/" underline="none"><Typography fontSize={16} sx={{ color: 'black' }}>FEEDBACKS</Typography></Link></Box></ListItem>
                    <ListItem><Box display={"flex"} alignItems={"center"}><DownloadIcon sx={{ color: 'black' }} /><Link pl={1} component={RouterLink} to="/admin/downloads/" underline="none"><Typography fontSize={16} sx={{ color: 'black' }}>DOWNLOADS</Typography></Link></Box></ListItem>
                    <Divider></Divider>
                </List>
            </Box>
        </>
    )
};

export default CustomSideBar;
