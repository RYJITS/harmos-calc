export enum Level {
  A = "A",
  B = "B",
  C = "C",
}

export enum Track {
  GENERAL = "Général (VG)",
  MODERNE = "Moderne",
  PRE_GYMNASE = "Pré-gymnasial (VP)",
}

export interface GradeComponent {
  id: string;
  name: string;
  grades: number[];
  average: number;
}

export interface Subject {
  id: string;
  name: string;
  isMain: boolean;
  hasLevel: boolean;
  level?: Level;
  components: GradeComponent[];
  grades: number[];
  average: number;
}
