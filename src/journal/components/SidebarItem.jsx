import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material"
import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote } from "../../store/journal/journalSlice";


export const SidebarItem = ({id, title, body, date, imageUrls=[]}) => {
    
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    }, [title])

    const dispatch = useDispatch();
    
    const onClickNote = () =>{
        dispatch(setActiveNote({id, title, body, date, imageUrls}));

    }

  return (
    <ListItem key={id} disablePadding>
        <ListItemButton onClick={ onClickNote } >
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid2 container>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={body}/>
            </Grid2>
        </ListItemButton>
    </ListItem>
  )
}
