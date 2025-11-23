import type { Content, FullJob, Job, JobsResponse } from "../types";

// Raw API response with strings in spanish
export interface RawJob {
    id: number;
    titulo: string;
    empresa: string;
    ubicacion: string;
    descripcion: string;
    data: {
        technology: string[];
        modalidad: string;
        nivel: string;
    };
    content?: Content;
}

export interface RawJobsResponse {
    total: number;
    limit: number;
    offset: number;
    results: number;
    data: RawJob[];
}

export function convertRawJob(res: RawJob): FullJob {
    return {
        id: res.id,
        title: res.titulo,
        company: res.empresa,
        location: res.ubicacion,
        description: res.descripcion,
        tags: {
            technology: res.data.technology,
            location: res.data.modalidad,
            level: res.data.nivel,
        },
        content: res.content as Content,
    };
}

export function convertRawJobsAll(res: RawJobsResponse): JobsResponse {
    return {
        total: res.total,
        limit: res.limit,
        offset: res.offset,
        results: res.results,
        data: res.data.map((job): Job => convertRawJob(job)),
    };
}
