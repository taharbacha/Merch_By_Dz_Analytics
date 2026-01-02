
import React from 'react';
import { useAppStore } from '../store';
import EditableCell from '../components/EditableCell';
import StatusBadge from '../components/StatusBadge';
import { GrosStatus } from '../types';
import { GROS_STATUS_OPTIONS } from '../constants';
import { Plus, Download } from 'lucide-react';

const CommandesGros: React.FC = () => {
  const { getCalculatedGros, updateGros, addGros } = useAppStore();
  const data = getCalculatedGros();

  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-DZ') + ' DA';
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Commandes GROS</h2>
          <p className="text-slate-500">Gestion des commandes en gros et suivi des encaissements.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={addGros}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} /> Ajouter une ligne
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600">Ref</th>
                <th className="p-4 font-semibold text-slate-600">Client</th>
                <th className="p-4 font-semibold text-slate-600">Contact</th>
                <th className="p-4 font-semibold text-slate-600">Date</th>
                <th className="p-4 font-semibold text-slate-600">Achat Art.</th>
                <th className="p-4 font-semibold text-slate-600">Impression</th>
                <th className="p-4 font-semibold text-slate-600">Prix Vente</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
                <th className="p-4 font-semibold text-slate-600">Total Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-2 font-mono text-xs font-bold text-slate-400">
                    <EditableCell value={item.reference} onSave={(v) => updateGros(item.id, 'reference', v)} />
                  </td>
                  <td className="p-2">
                    <EditableCell value={item.client_name} onSave={(v) => updateGros(item.id, 'client_name', v)} className="font-medium" />
                  </td>
                  <td className="p-2 text-slate-500">
                    <EditableCell value={item.client_phone} onSave={(v) => updateGros(item.id, 'client_phone', v)} />
                  </td>
                  <td className="p-2">
                    <EditableCell type="date" value={item.date_created} onSave={(v) => updateGros(item.id, 'date_created', v)} />
                  </td>
                  <td className="p-2">
                    <EditableCell type="number" value={item.prix_achat_article} onSave={(v) => updateGros(item.id, 'prix_achat_article', v)} className="text-right" />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                       <input 
                        type="checkbox" 
                        checked={item.impression} 
                        onChange={(e) => updateGros(item.id, 'impression', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                      {item.impression && (
                        <EditableCell type="number" value={item.prix_impression} onSave={(v) => updateGros(item.id, 'prix_impression', v)} className="w-20 text-right" />
                      )}
                    </div>
                  </td>
                  <td className="p-2 font-bold text-slate-800">
                    <EditableCell type="number" value={item.prix_vente} onSave={(v) => updateGros(item.id, 'prix_vente', v)} className="text-right" />
                  </td>
                  <td className="p-2">
                    <select 
                      value={item.status} 
                      onChange={(e) => updateGros(item.id, 'status', e.target.value)}
                      className="text-xs p-1 border-none bg-transparent hover:bg-white rounded cursor-pointer outline-none font-semibold text-slate-600"
                    >
                      {GROS_STATUS_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt.replace(/_/g, ' ').toUpperCase()}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-right font-black">
                    <span className={item.profit_encaisse > 0 ? 'text-emerald-600' : 'text-slate-400'}>
                      {formatPrice(item.prix_vente - item.cost)}
                    </span>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">Aucune commande. Ajoutez une ligne pour commencer.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommandesGros;
