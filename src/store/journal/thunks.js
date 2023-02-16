import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNotes, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        // uid        
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notas`) ); 
        const setDocResp = await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        // dispatch
        // Insert newNote on State
        dispatch(addNewEmptyNote(newNote));
        // Active newNote on State
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;

        if(!uid) throw new Error('El usuario no existe');

        const userNotes = await loadNotes(uid);

        dispatch( setNotes(userNotes) );
    }
}

export const startSavingNote = () => {
    return async(dispatch, getState) => {

        dispatch( setSaving() );

        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true});
        
        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch( setSaving() );

        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload( file ))
        }

        const photosURL = await Promise.all(fileUploadPromises);
        dispatch( setPhotosToActiveNotes(photosURL) );
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        const noteID = note.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${noteID}`);
        const Resp = await deleteDoc(docRef);
        
        dispatch(deleteNoteById(noteID));
    }
}