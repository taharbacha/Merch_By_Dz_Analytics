
import React from 'react';
import { useAppStore } from '../store';
import EditableCell from '../components/EditableCell';
import { OFFRE_TYPE_OPTIONS, OFFRE_CATEGORY_OPTIONS } from '../constants';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

const Offres: React.FC = () => {
  const { offres, updateOffre, addOffre } = useAppStore();

  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-DZ') + ' DA';
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Offres & Frais Globaux</h2>
          <p className="text-slate-500">Mouvements financiers non liés à une commande spécifique (Ads, Transport, etc.).</p>
        </div>
        <button 
          onClick={addOffre}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} /> Ajouter un mouvement
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600">Date</th>
                <th className="p-4 font-semibold text-slate-600">Type</th>
                <th className="p-4 font-semibold text-slate-600">Catégorie</th>
                <th className="p-4 font-semibold text-slate-600">Description</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {offres.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-2">
                    <EditableCell type="date" value={item.date} onSave={(v) => updateOffre(item.id, 'date', v)} />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {item.type === 'revenue' ? <TrendingUp size={16} className="text-emerald-500" /> : <TrendingDown size={16} className="text-orange-500" />}
                      <select 
                        value={item.type} 
                        onChange={(e) => updateOffre(item.id, 'type', e.target.value)}
                        className="text-xs p-1 border-none bg-transparent rounded font-bold uppercase text-slate-600"
                      >
                        {OFFRE_TYPE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="p-2">
                    <select 
                      value={item.category} 
                      onChange={(e) => updateOffre(item.id, 'category', e.target.value)}
                      className="text-xs p-1 border-none bg-transparent rounded text-slate-600"
                    >
                      {OFFRE_CATEGORY_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 flex-1">
                    <EditableCell value={item.description} onSave={(v) => updateOffre(item.id, 'description', v)} className="min-w-[200px]" />
                  </td>
                  <td className="p-2 text-right">
                    <EditableCell 
                      type="number" 
                      value={item.montant} 
                      onSave={(v) => updateOffre(item.id, 'montant', v)} 
                      className={`text-right font-bold ${item.type === 'revenue' ? 'text-emerald-600' : 'text-orange-600'}`} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Offres;
