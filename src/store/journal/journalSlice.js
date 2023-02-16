import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
       isSaving: false,
       messageSaved: '',
       notes: [],
       active: null,
    //    active: {
    //         id: 'ABC123',
    //         title: '',
    //         body: '',
    //         date: 123456,
    //         imageUrls: [], // https://foto1.jpg, https://foto2.jpg
    //    }
   },
   reducers: {
       savingNewNote: ( state ) => {
            state.isSaving = true;
       },
       addNewEmptyNote: ( state, { payload } ) => {
            state.notes.push( payload );
            state.isSaving = false;
       },
       setActiveNote: (state, {payload} ) => {
            state.active = payload;
            state.messageSaved = '';
       },
       setNotes: ( state, { payload }) => {
          state.notes = payload;
       },
       setSaving: (state) => {
          state.isSaving = true;
          state.messageSaved = '';
       },
       setPhotosToActiveNotes: (state, { payload }) => {
          state.active.imageUrls = [...state.active.imageUrls, ...payload];
          state.isSaving = false;
       },
       updateNote: ( state, {payload} ) => {
          state.isSaving = false;
          state.notes = state.notes.map(
               (note) => (
                    ( payload.id === note.id )
                         ? note = payload
                         : note
               )
          );

          state.messageSaved = `${payload.title }, actualizada correctamente`;
          // TOOD Mostrar mensaje de actualizacion
       },
       deleteNoteById: ( state, { payload } ) => {

            state.notes = state.notes.filter(note => note.id !== payload)
       },
       clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
       }
   }
});


// Action creators are generated for each case reducer function
export const { clearNotesLogout, setPhotosToActiveNotes, savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;