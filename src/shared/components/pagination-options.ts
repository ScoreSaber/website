// credits: @TahaSh, original svelte-paginate

type PaginationSymbol = 'PREVIOUS_PAGE' | 'NEXT_PAGE' | 'ELLIPSIS';

const PREVIOUS_PAGE: PaginationSymbol = 'PREVIOUS_PAGE';
const NEXT_PAGE: PaginationSymbol = 'NEXT_PAGE';
const ELLIPSIS: PaginationSymbol = 'ELLIPSIS';

type PaginationInfo = {
   totalItems: number;
   pageSize: number;
   currentPage: number;
   limit: number;
   showStepOptions: boolean;
};

type PaginationOptions = { type: 'number'; value: number } | { type: 'symbol'; value: number; symbol: PaginationSymbol };

export function generateNavigationOptions(info: PaginationInfo) {
   const totalPages = Math.ceil(info.totalItems / info.pageSize);
   const limitThreshold = getLimitThreshold(info.limit);
   const limited = info.limit && totalPages > limitThreshold;
   const options: PaginationOptions[] = limited ? generateLimitedOptions(totalPages, info) : generateUnlimitedOptions(totalPages);
   return info.showStepOptions ? addStepOptions(options, info.currentPage, totalPages) : options;
}

function generateUnlimitedOptions(totalPages: number) {
   const options: PaginationOptions[] = [];
   for (let i = 1; i <= totalPages; i++) {
      options.push({ type: 'number', value: i });
   }
   return options;
}

function generateLimitedOptions(totalPages: number, { limit, currentPage }: PaginationInfo) {
   const boundarySize = limit * 2 + 2;
   const firstBoundary = 1 + boundarySize;
   const lastBoundary = totalPages - boundarySize;
   const totalShownPages = firstBoundary + 2;

   const options: PaginationOptions[] = [];

   if (currentPage <= firstBoundary - limit) {
      for (let i = 0; i < totalShownPages; i++) {
         if (i === totalShownPages - 1) {
            options.push({ type: 'number', value: totalPages });
            continue;
         }
         if (i === totalShownPages - 2) {
            options.push({ type: 'symbol', symbol: ELLIPSIS, value: firstBoundary + 1 });
            continue;
         }
         options.push({ type: 'number', value: i + 1 });
      }
      return options;
   }

   if (currentPage >= lastBoundary + limit) {
      for (let i = 0; i < totalShownPages; i++) {
         if (i === 0) {
            options.push({ type: 'number', value: 1 });
            continue;
         }
         if (i === 1) {
            options.push({ type: 'symbol', symbol: ELLIPSIS, value: lastBoundary - 1 });
            continue;
         }
         options.push({ type: 'number', value: lastBoundary + i - 2 });
      }
      return options;
   }

   // middle range
   for (let i = 0; i < totalShownPages; i++) {
      if (i === 0) {
         options.push({ type: 'number', value: 1 });
         continue;
      }
      if (i === 1) {
         options.push({ type: 'symbol', symbol: ELLIPSIS, value: currentPage - limit + (i - 2) });
         continue;
      }
      if (i === totalShownPages - 1) {
         options.push({ type: 'number', value: totalPages });
         continue;
      }
      if (i === totalShownPages - 2) {
         options.push({ type: 'symbol', symbol: ELLIPSIS, value: currentPage + limit + 1 });
         continue;
      }
      options.push({ type: 'number', value: currentPage - limit + (i - 2) });
   }

   return options;
}

function addStepOptions(options: PaginationOptions[], currentPage: number, totalPages: number): PaginationOptions[] {
   if (options.length === 0) return options;

   return [
      {
         type: 'symbol',
         symbol: PREVIOUS_PAGE,
         value: currentPage <= 1 ? 1 : currentPage - 1
      },
      ...options,
      {
         type: 'symbol',
         symbol: NEXT_PAGE,
         value: currentPage >= totalPages ? totalPages : currentPage + 1
      }
   ];
}

function getLimitThreshold(limit: number) {
   const maximumUnlimitedPages = 3;
   const numberOfBoundaryPages = 2;
   return limit * 2 + maximumUnlimitedPages + numberOfBoundaryPages;
}
