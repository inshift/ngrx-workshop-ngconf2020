import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { exhaustMap, concatMap, mergeMap, map } from "rxjs/operators";
import { BooksService } from "../shared/services";
import { BooksPageActions, BooksApiActions } from "./actions";

@Injectable()
export class BooksApiEffects {
  constructor(private booksService: BooksService, private actions$: Actions) {}

  loadBooks$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BooksPageActions.enter),
        exhaustMap(() =>
          this.booksService
            .all()
            .pipe(map(books => BooksApiActions.booksLoaded({ books })))
        )
      );
    }
  );

  createBook$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BooksPageActions.createBook),
        concatMap(action =>
        this.booksService
          .create(action.book)
          .pipe(map(book => BooksApiActions.bookCreated({ book })))
        )
      );
    }
  );

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(BooksPageActions.updateBook),
        concatMap(action =>
          this.booksService
            .update(action.bookId, action.changes)
            .pipe(map(book => BooksApiActions.bookUpdated({ book })))
        )
      );
    }
  );

  deleteBook$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BooksPageActions.deleteBook),
        mergeMap(action =>
          this.booksService
            .delete(action.bookId)
            .pipe(
              map(() => BooksApiActions.bookDeleted({ bookId: action.bookId }))
            )
        )
      );
    }
  );
}