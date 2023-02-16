import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ title = '' , body = '', note}) => {

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title])

    const newBody = useMemo( () => {
        return body.length > 70
            ? body.substring(0, 70) + '...'
            : body;
    }, [body])

    const dispatch = useDispatch();
    
    const onClickNote = () => {
        dispatch(setActiveNote(note));
    }

    return (
        <ListItem disablePadding onClick={ onClickNote } >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle }/>
                    <ListItemText secondary={ newBody }/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
