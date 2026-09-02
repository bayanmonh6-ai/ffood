'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Store, Bell, Truck, Shield, Save, CheckCircle2, AlertTriangle } from 'lucide-react';
import SettingsToggle from './SettingsToggle';
import ConfirmModal from './ConfirmModal';
import Icon from '@/components/ui/AppIcon';


const SETTINGS_TABS = [
  { id: 'stab-restaurant', label: 'Restaurant Profile', icon: Store, slug: 'restaurant' },
  { id: 'stab-delivery', label: 'Delivery Settings', icon: Truck, slug: 'delivery' },
  { id: 'stab-notifications', label: 'Notifications', icon: Bell, slug: 'notifications' },
  { id: 'stab-account', label: 'Account & Security', icon: Shield, slug: 'account' },
];

interface RestaurantFormValues {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  openTime: string;
  closeTime: string;
  cuisine: string;
  website: string;
}

interface DeliveryFormValues {
  deliveryRadius: string;
  minOrder: string;
  deliveryFee: string;
  freeDeliveryThreshold: string;
  estimatedTime: string;
}

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('restaurant');
  const [isSaving, setIsSaving] = useState(false);
  const [savedTab, setSavedTab] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Notification toggles
  const [notifNewOrder, setNotifNewOrder] = useState(true);
  const [notifOrderStatus, setNotifOrderStatus] = useState(true);
  const [notifDailyReport, setNotifDailyReport] = useState(false);
  const [notifLowStock, setNotifLowStock] = useState(true);
  const [notifReviews, setNotifReviews] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifPush, setNotifPush] = useState(true);

  const restaurantForm = useForm<RestaurantFormValues>({
    defaultValues: {
      name: 'NomNom Kitchen',
      tagline: 'Swift delivery, bold flavors',
      email: 'contact@nomnomkitchen.com',
      phone: '+1 (212) 555-0194',
      address: '84 West Broadway',
      city: 'New York, NY 10007',
      openTime: '08:00',
      closeTime: '22:00',
      cuisine: 'International, Mediterranean, Fusion',
      website: 'https://nomnomkitchen.com',
    },
  });

  const deliveryForm = useForm<DeliveryFormValues>({
    defaultValues: {
      deliveryRadius: '8',
      minOrder: '15.00',
      deliveryFee: '3.99',
      freeDeliveryThreshold: '45.00',
      estimatedTime: '35',
    },
  });

  const handleSave = async (tab: string) => {
    setIsSaving(true);
    // BACKEND INTEGRATION: PATCH /api/settings — save restaurant or delivery settings
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    setSavedTab(tab);
    setTimeout(() => setSavedTab(null), 2500);
  };

  const SaveButton = ({ tab }: { tab: string }) => (
    <button
      type="button"
      disabled={isSaving}
      onClick={() => handleSave(tab)}
      className="btn-primary min-w-[130px]"
    >
      {isSaving ? (
        <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg><span>Saving…</span></>
      ) : savedTab === tab ? (
        <><CheckCircle2 size={15} className="text-green-300" /><span>Saved!</span></>
      ) : (
        <><Save size={15} /><span>Save Changes</span></>
      )}
    </button>
  );

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your restaurant profile, delivery, and notification preferences.</p>
      </div>

      <div className="flex gap-6">
        {/* Left Nav */}
        <div className="w-52 flex-shrink-0">
          <nav className="flex flex-col gap-1">
            {SETTINGS_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.slug;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.slug)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                    isActive
                      ? 'bg-foreground text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Restaurant Profile */}
          {activeTab === 'restaurant' && (
            <>
              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
                <h2 className="text-base font-bold text-foreground mb-1">Restaurant Information</h2>
                <p className="text-sm text-muted-foreground mb-5">Basic details shown to customers on your menu listing.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Restaurant name</label>
                    <input {...restaurantForm.register('name', { required: 'Name is required' })} className="form-input" />
                    {restaurantForm.formState.errors.name && <p className="form-error">{restaurantForm.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Tagline</label>
                    <p className="text-xs text-muted-foreground mb-1.5">Short phrase shown below your restaurant name.</p>
                    <input {...restaurantForm.register('tagline')} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Contact email</label>
                    <input {...restaurantForm.register('email', { required: true, pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} type="email" className="form-input" />
                    {restaurantForm.formState.errors.email && <p className="form-error">{restaurantForm.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Phone number</label>
                    <input {...restaurantForm.register('phone', { required: 'Phone is required' })} type="tel" className="form-input" />
                    {restaurantForm.formState.errors.phone && <p className="form-error">{restaurantForm.formState.errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Street address</label>
                    <input {...restaurantForm.register('address')} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">City, State, ZIP</label>
                    <input {...restaurantForm.register('city')} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Cuisine types</label>
                    <p className="text-xs text-muted-foreground mb-1.5">Comma-separated list of cuisine styles.</p>
                    <input {...restaurantForm.register('cuisine')} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Website</label>
                    <input {...restaurantForm.register('website')} type="url" className="form-input" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
                <h2 className="text-base font-bold text-foreground mb-1">Operating Hours</h2>
                <p className="text-sm text-muted-foreground mb-5">Set your daily open and close times for order acceptance.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Opening time</label>
                    <input {...restaurantForm.register('openTime')} type="time" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Closing time</label>
                    <input {...restaurantForm.register('closeTime')} type="time" className="form-input" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <SaveButton tab="restaurant" />
              </div>
            </>
          )}

          {/* Delivery Settings */}
          {activeTab === 'delivery' && (
            <>
              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
                <h2 className="text-base font-bold text-foreground mb-1">Delivery Configuration</h2>
                <p className="text-sm text-muted-foreground mb-5">Control delivery radius, minimum order, and fee structure.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Delivery radius (km)</label>
                    <p className="text-xs text-muted-foreground mb-1.5">Maximum distance for deliveries from your location.</p>
                    <input {...deliveryForm.register('deliveryRadius', { required: true, min: { value: 1, message: 'Minimum 1km' } })} type="number" className="form-input" />
                    {deliveryForm.formState.errors.deliveryRadius && <p className="form-error">{deliveryForm.formState.errors.deliveryRadius.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Minimum order ($)</label>
                    <p className="text-xs text-muted-foreground mb-1.5">Orders below this amount will not be accepted.</p>
                    <input {...deliveryForm.register('minOrder', { required: true })} type="number" step="0.01" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Delivery fee ($)</label>
                    <p className="text-xs text-muted-foreground mb-1.5">Standard fee charged per delivery.</p>
                    <input {...deliveryForm.register('deliveryFee', { required: true })} type="number" step="0.01" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Free delivery threshold ($)</label>
                    <p className="text-xs text-muted-foreground mb-1.5">Orders above this value receive free delivery.</p>
                    <input {...deliveryForm.register('freeDeliveryThreshold')} type="number" step="0.01" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Estimated delivery time (min)</label>
                    <p className="text-xs text-muted-foreground mb-1.5">Shown to customers at checkout as an estimate.</p>
                    <input {...deliveryForm.register('estimatedTime', { required: true })} type="number" className="form-input" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <SaveButton tab="delivery" />
              </div>
            </>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <>
              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
                <h2 className="text-base font-bold text-foreground mb-1">Order Alerts</h2>
                <p className="text-sm text-muted-foreground mb-5">Choose which order events trigger a notification.</p>
                <div className="flex flex-col gap-4">
                  {[
                    { id: 'notif-new-order', label: 'New order received', desc: 'Get notified instantly when a new order is placed.', val: notifNewOrder, set: setNotifNewOrder },
                    { id: 'notif-status', label: 'Order status changes', desc: 'Alert when an order moves to In Progress, Delivered, or Cancelled.', val: notifOrderStatus, set: setNotifOrderStatus },
                    { id: 'notif-stock', label: 'Low menu availability', desc: 'Warn when a dish category has fewer than 2 active items.', val: notifLowStock, set: setNotifLowStock },
                    { id: 'notif-reviews', label: 'New customer review', desc: 'Notify when a customer leaves a review or rating.', val: notifReviews, set: setNotifReviews },
                    { id: 'notif-report', label: 'Daily revenue report', desc: 'Receive a summary of orders and revenue each morning at 8am.', val: notifDailyReport, set: setNotifDailyReport },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <SettingsToggle enabled={item.val} onChange={item.set} id={item.id} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
                <h2 className="text-base font-bold text-foreground mb-1">Notification Channels</h2>
                <p className="text-sm text-muted-foreground mb-5">Select how you want to receive alerts.</p>
                <div className="flex flex-col gap-4">
                  {[
                    { id: 'ch-email', label: 'Email notifications', desc: 'Send alerts to contact@nomnomkitchen.com', val: notifEmail, set: setNotifEmail },
                    { id: 'ch-sms', label: 'SMS notifications', desc: 'Send alerts to +1 (212) 555-0194', val: notifSms, set: setNotifSms },
                    { id: 'ch-push', label: 'Push notifications', desc: 'Browser push alerts on this device.', val: notifPush, set: setNotifPush },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <SettingsToggle enabled={item.val} onChange={item.set} id={item.id} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <SaveButton tab="notifications" />
              </div>
            </>
          )}

          {/* Account & Security */}
          {activeTab === 'account' && (
            <>
              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
                <h2 className="text-base font-bold text-foreground mb-1">Account Information</h2>
                <p className="text-sm text-muted-foreground mb-5">Your login credentials and account details.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full name</label>
                    <input defaultValue="Marco Rossi" className="form-input" readOnly />
                  </div>
                  <div>
                    <label className="form-label">Role</label>
                    <input defaultValue="Restaurant Manager" className="form-input bg-muted" readOnly />
                  </div>
                  <div className="col-span-2">
                    <label className="form-label">Login email</label>
                    <input defaultValue="marco.rossi@nomnomkitchen.com" type="email" className="form-input" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
                <h2 className="text-base font-bold text-foreground mb-1">Change Password</h2>
                <p className="text-sm text-muted-foreground mb-5">Update your password. Minimum 8 characters.</p>
                <div className="flex flex-col gap-4 max-w-sm">
                  <div>
                    <label className="form-label">Current password</label>
                    <input type="password" className="form-input" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="form-label">New password</label>
                    <input type="password" className="form-input" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="form-label">Confirm new password</label>
                    <input type="password" className="form-input" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <SaveButton tab="account" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--border)', borderColor: '#FCA5A5' }}>
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-base font-bold text-red-600">Danger Zone</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Irreversible actions. Proceed with caution.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200">
                  <div>
                    <p className="text-sm font-semibold text-red-700">Delete restaurant account</p>
                    <p className="text-xs text-red-500 mt-0.5">This will permanently delete all menu data, orders, and settings. This cannot be undone.</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors duration-150 active:scale-95 flex-shrink-0 ml-4"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          title="Delete Restaurant Account"
          message="This will permanently delete NomNom Kitchen, all menu items, order history, and settings. This action cannot be undone."
          confirmLabel="Yes, Delete Everything"
          onConfirm={() => setShowDeleteModal(false)}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}