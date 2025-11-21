import type { Job, JobsResponse } from "../api/types";

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
}

export interface RawJobsResponse {
    total: number;
    limit: number;
    offset: number;
    results: number;
    data: RawJob[];
}

export function convertRawApi(res: RawJobsResponse): JobsResponse {
    return {
        total: res.total,
        limit: res.limit,
        offset: res.offset,
        results: res.results,
        data: res.data.map((job): Job => ({
            id: job.id,
            title: job.titulo,
            company: job.empresa,
            location: job.ubicacion,
            description: job.descripcion,
            tags: {
                technology: job.data.technology,
                location: job.data.modalidad,
                level: job.data.nivel,
            },
        })),
    };
}
