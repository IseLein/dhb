
export type Hymn = {
    hymn: number;
    title: string;
    bible_ref: string;
    key: string;
    verses: string[][];
    chorus?: string[];
    author?: string;
    author_music?: string;
    meta_title?: string;
    meta_music?: string;
};

