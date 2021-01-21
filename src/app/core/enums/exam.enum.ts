export enum ExamType {
      CD  =       1,
      CR  =       2,
      CT  =       3,
      DSA =       4,
      DX  =       5,
      MG  =       6,
      MR  =       7,
      NM  =       8,
      PET =       9,
      US  =       10,
      XA  =       11
}


export enum ExamClassification{
  NON_URGENT     = 1,
  ROUTINE        = 2,
  URGENT         = 3,
  VERY_URGENT    = 4,
  IMMEDIATE      = 5
}

export enum ExamStatus{
  STATUS_IMPORTED   = 1,
  STATUS_VALIDATED  = 2,
  STATUS_PROGRESS   = 3,
  STATUS_REVISION   = 4,
  STATUS_FINISHED   = 5,
  STATUS_RELEASED   = 6
}
