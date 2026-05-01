import React from 'react';
import { Filter, ChevronLeft, ChevronRight, ArrowRight, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Archive() {
  const archives = [
    {
      id: '1',
      title: 'Global Expansion Framework 2024',
      tag: 'Q3 Strategy',
      description: 'A comprehensive analysis of emerging market opportunities in Southeast Asia, outlining risk mitigation strategies and regional leadership structural alignments for the next fiscal year.',
      date: 'Oct 12, 2024',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3CPGVXQHtLRIViOQ7sv5Zg5NetUBdj44zbpku9-M-eqmBrywwJIpWqxXfxLJL0VDLiXkzGxurLUUEPgYhmpeD1mwsgy8ACERWuVVjdcPqazW0kMYTeV2Sdsdev6fRlLxJJZqE9kb-Kg__lgGN1cCQF1DbMKpC6TIu_lpMPPO-ryUYxrCD6jtsglx117yomSsBa7_zQcwxhnSfOJVmM6zsYjBqzseiJdekevkTIiS4kKXOBoQLshSBCEUOnuDrJx1UPPa7zu1I3x8Z",
      featured: true
    },
    {
      id: '2',
      title: 'Cybersecurity Infrastructure V2',
      tag: 'Tech Audit',
      description: 'Post-incident forensic report and roadmap for zero-trust deployment across distributed nodes.',
      date: 'Sep 28, 2024',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3qmWlEmqXVoeRQDUzbpTzJFk3NJQsRX0SL-uad8B7YcJSvf0zdgmezH9zKAuyuSQuNc1GQo7y945Z9DJbke6W7zEeHiZKaNv3bKCi67KsK8SiTf-h_ahvA6X_cBVqVcDcmci5DDoEmeJVU0Mb7ZLMAGPQucgg0D9LdcbKD2i2b1h9BHrA2yR1479QwWrv9o5prJ5k4T2_l1IA9Mh3LLAFKjdnTUzX3B3n93h-i0g8a-I7bcA4X5IozFr6cImMPZbdS3Jecif64QGn"
    },
    {
      id: '3',
      title: 'Logistics Optimization Protocol',
      tag: 'Ops Review',
      description: 'Quarterly assessment of supply chain efficiency and transit-time reductions for EMEA shipping routes.',
      date: 'Sep 15, 2024',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwvjufEdpYovYTPULY5YYhDyU9DjvAdZXp_xCWXC_HWDS2IE5a6obJfPHWNvJMwzDhLeneir_7RA6oT3dR0ucPtNkeL_mVsIs66Ttmg4gm0rbNqQPzncLmTZlZDf-ziHQYXUwJHj0WWlR-dJohUmTSdfYbB7PvfxERH_MbYpoKFAvSKDsMle4R1XYHkpL_TVYl9udlJK-15meSH-Pf-8T_NP-2UkdIwi0dvRU4iog9i3PgFodPhSyVJ6-F-MBKm7zlgZv6FTFmAhNg"
    },
    {
      id: '4',
      title: 'Fiscal Year Projections',
      tag: 'Finance',
      date: 'Aug 30, 2024',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN-l_L5Ky0h2eDE0schvEQ_C33C4z7U1toFHRYpVMb2SzBKlO2S00H737pU1K928WKLtSet9fU-x5QsdlQvObum4X5niAFRKlGkB53IuHWBYRBToqWTZBXoxA7GEIeVuiHNxhXADceesDwG_XlFP7EpEXYHWl_9c7VELc4z9fu1_ZHbAmwjjbCMIUhgfFz0UHmOPJfKdODd-cLWDZFK-G6ChlhszYBu0qdCr5SIE7UMNNomlvs4BMqChVQJNp82lOZPZb4FHLHCthR",
      small: true
    },
    {
      id: '5',
      title: 'Board Alignment Memo',
      tag: 'Leadership',
      date: 'Aug 22, 2024',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_1tB2Ueu4zctg_ArjjG6EIltdwENAvt6uSboq03HrXWUsayodv06oW3Y943qPeCUNmeIbckmRNSxKllRkVpgfGhzpN_fF7KDSvdhUcsf3TBUQZZ7NPXG_ThCC43NYN-Yqw94xjiis32OlgvfCpfZmH0TEAT4Z8BBMGBTUfZ4XDBMj6hyEWDw5nk2RyNRbt_dROTVXNmermYhntj3ALZlOt5HYyUQNmHOBBYz7XHAyQvDw97oFjRAwX4F_f_MHuik6eJBh6pj4VUUn",
      small: true
    },
    {
      id: '6',
      title: 'Privacy Shield Audit',
      tag: 'Compliance',
      date: 'Aug 10, 2024',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyQTxvG81vU9yelazgt8axYpwJoqrj9YBKgohQToYb-AMEKSFfWd-fV7MpHzgajWlJqAptbVNWnylV7Laecv5p5Veslqbsm1MZK6FzSDV6O6RDMe7R_UgK1RK6kko3mkNrUPvdT__Jejhm2i6iyHje14G23N2nY59rftNP3ecli0QsLnXXdKcSf8BXXIZRgdQLM8M_-0ZCqLk63Z0ObRVEHDc_dqVzwuFbvgV8cmTRyb8qmHsHN9CroM1xQDCQFYYyv_BZb3fzO1Vy",
      small: true
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="mb-12 border-b border-zinc-200 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-label-caps text-on-primary-container mb-2 block tracking-widest">Digital Repository</span>
            <h1 className="font-h1-display text-on-surface">Intelligence Archive</h1>
            <p className="font-body-meta text-on-surface-variant mt-2 max-w-xl">
              Access the definitive record of past strategic briefs and organizational intelligence.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-zinc-200 rounded-sm text-sm font-medium hover:bg-zinc-50 flex items-center gap-2 transition-colors">
              <Filter className="size-4" /> 
              Filters
            </button>
            <button className="px-4 py-2 border border-zinc-200 rounded-sm text-sm font-medium hover:bg-zinc-50 flex items-center gap-2 transition-colors">
              <ArrowRight className="size-4 rotate-90" /> 
              Sort by Date
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {archives.map((item) => {
          if (item.featured) {
            return (
              <div key={item.id} className="col-span-12 group cursor-pointer border border-zinc-200 bg-white hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row h-auto md:h-80">
                  <div className="w-full md:w-2/3 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-full md:w-1/3 p-8 flex flex-col justify-between">
                    <div>
                      <span className="font-label-caps text-[10px] text-zinc-600 bg-zinc-100 px-2 py-1 inline-block mb-4">
                        {item.tag}
                      </span>
                      <h2 className="font-h2-module text-on-surface mb-3 line-clamp-2">{item.title}</h2>
                      <p className="font-body-meta text-on-surface-variant line-clamp-4">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-4">
                      <span className="font-body-meta text-xs text-zinc-400">{item.date}</span>
                      <ArrowRight className="size-5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (item.small) {
            return (
              <div key={item.id} className="col-span-12 md:col-span-4 group cursor-pointer border border-zinc-200 bg-white hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-square relative overflow-hidden bg-zinc-50">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <span className="font-label-caps text-[10px] text-zinc-500 mb-2 block uppercase tracking-widest">{item.tag}</span>
                  <h4 className="font-h2-module text-on-surface text-lg mb-1">{item.title}</h4>
                  <span className="text-[10px] text-zinc-400 font-medium uppercase">{item.date}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className="col-span-12 md:col-span-6 group cursor-pointer border border-zinc-200 bg-white hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <span className="font-label-caps text-[10px] text-zinc-500 bg-zinc-100 px-2 py-1 inline-block mb-3 uppercase tracking-wider">{item.tag}</span>
                <h3 className="font-h2-module text-on-surface mb-2 h-14 line-clamp-2">{item.title}</h3>
                <p className="font-body-meta text-on-surface-variant line-clamp-2">{item.description}</p>
                <div className="mt-4 pt-4 border-t border-zinc-50 flex justify-between items-center text-zinc-400">
                  <span className="text-xs font-medium">{item.date}</span>
                  <Eye className="size-4 group-hover:text-zinc-900 transition-colors" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex items-center justify-between border-t border-zinc-200 pt-10">
        <div className="text-sm text-zinc-400 font-body-meta">
          Showing <span className="font-bold text-on-surface">1 - 6</span> of <span className="font-bold text-on-surface">48</span> archived briefs
        </div>
        <div className="flex items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded border border-zinc-200 hover:bg-zinc-50 text-on-surface transition-colors">
            <ChevronLeft className="size-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-zinc-900 text-white font-bold text-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded border border-transparent hover:bg-zinc-50 text-on-surface font-medium text-sm transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded border border-transparent hover:bg-zinc-50 text-on-surface font-medium text-sm transition-colors">3</button>
          <span className="px-2 text-zinc-300">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded border border-transparent hover:bg-zinc-50 text-on-surface font-medium text-sm transition-colors">8</button>
          <button className="w-10 h-10 flex items-center justify-center rounded border border-zinc-200 hover:bg-zinc-50 text-on-surface transition-colors">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
