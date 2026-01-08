export type GarmentType = "tshirt" | "pants";

export type Project = {
  id: string;

  // link PDF generati dal backend
  pdf_plotter_url?: string | null;
  pdf_a4_url?: string | null;

  // eventuali campi extra (tolleranza)
  [key: string]: unknown;
};
