import { Exercise } from './../training/exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChange = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getTrainingExercises(): Exercise[] {
    return this.availableExercises.slice();
  }
  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }
  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * ( progress / 100),
      calories: this.runningExercise.calories * ( progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(x => x.id === selectedId);
    this.exerciseChange.next({...this.runningExercise});
  }
  getRunningExercise(): Exercise {
    return {...this.runningExercise };
  }
  getCompletedOrCancelledExercises(): Exercise[] {
    return this.exercises.slice();
  }
}
