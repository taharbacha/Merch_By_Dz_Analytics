
import React from 'react';
import { useAppStore } from '../store';
import EditableCell from '../components/EditableCell';
import { EXTERN_STATUS_OPTIONS } from '../constants';
import { Plus } from 'lucide-react';

const CommandesDetail: React.FC = () => {
  const { getCalculatedExtern, updateExtern, addExtern } = useAppStore();
  const data = getCalculatedExtern();

  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-DZ') + ' DA';
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Commandes Détail</h2>
          <p className="text-slate-500">Commandes client externe avec gestion simplifiée.</p>
        </div>
        <button 
          onClick={addExtern}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} /> Ajouter une ligne
        </button>
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
                <th className="p-4 font-semibold text-slate-600">Coût</th>
                <th className="p-4 font-semibold text-slate-600">Vente</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
                <th className="p-4 font-semibold text-slate-600">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-2 font-mono text-xs font-bold text-slate-400">
                    <EditableCell value={item.reference} onSave={(v) => updateExtern(item.id, 'reference', v)} />
                  </td>
                  <td className="p-2">
                    <EditableCell value={item.client_name} onSave={(v) => updateExtern(item.id, 'client_name', v)} className="font-medium" />
                  </td>
                  <td className="p-2 text-slate-500">
                    <EditableCell value={item.client_phone} onSave={(v) => updateExtern(item.id, 'client_phone', v)} />
                  </td>
                  <td className="p-2">
                    <EditableCell type="date" value={item.date_created} onSave={(v) => updateExtern(item.id, 'date_created', v)} />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                       <EditableCell type="number" value={item.prix_achat_article} onSave={(v) => updateExtern(item.id, 'prix_achat_article', v)} className="w-20 text-right" />
                       <span className="text-xs text-slate-400">+</span>
                       <EditableCell type="number" value={item.prix_impression} onSave={(v) => updateExtern(item.id, 'prix_impression', v)} className="w-20 text-right" />
                    </div>
                  </td>
                  <td className="p-2 font-bold text-slate-800 text-right">
                    <EditableCell type="number" value={item.prix_vente} onSave={(v) => updateExtern(item.id, 'prix_vente', v)} className="text-right" />
                  </td>
                  <td className="p-2">
                    <select 
                      value={item.status} 
                      onChange={(e) => updateExtern(item.id, 'status', e.target.value)}
                      className="text-xs p-1 border-none bg-transparent hover:bg-white rounded cursor-pointer outline-none font-semibold text-slate-600"
                    >
                      {EXTERN_STATUS_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt.replace(/_/g, ' ').toUpperCase()}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <EditableCell value={item.stock_note} onSave={(v) => updateExtern(item.id, 'stock_note', v)} className="text-slate-500" />
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

export default CommandesDetail;
