import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SupportTickets = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  const supportTickets = [
    {
      id: 1,
      ticketId: "TKT-2025-001",
      subject: "AC not working in room",
      category: "Maintenance",
      priority: "high",
      status: "In Progress",
      createdDate: "2025-01-16",
      lastUpdate: "2025-01-17",
      pgName: "Sunrise PG for Women",
      responses: 3
    },
    {
      id: 2,
      ticketId: "TKT-2025-002",
      subject: "WiFi connectivity issues",
      category: "Technical",
      priority: "medium",
      status: "Open",
      createdDate: "2025-01-15",
      lastUpdate: "2025-01-15",
      pgName: "Sunrise PG for Women",
      responses: 1
    },
    {
      id: 3,
      ticketId: "TKT-2025-003",
      subject: "Request for room change",
      category: "General",
      priority: "low",
      status: "Resolved",
      createdDate: "2025-01-10",
      lastUpdate: "2025-01-12",
      pgName: "Metro Boys Hostel",
      responses: 5
    }
  ];

  const categoryOptions = [
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'technical', label: 'Technical' },
    { value: 'billing', label: 'Billing' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'complaint', label: 'Complaint' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'text-warning bg-warning/10';
      case 'In Progress':
        return 'text-primary bg-primary/10';
      case 'Resolved':
        return 'text-success bg-success/10';
      case 'Closed':
        return 'text-text-secondary bg-muted';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'high':
        return 'text-error bg-error/10';
      case 'urgent':
        return 'text-error bg-error/20 font-bold';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const handleCreateTicket = () => {
    // Mock create ticket functionality
    setShowCreateForm(false);
    setNewTicket({
      subject: '',
      category: '',
      priority: 'medium',
      description: ''
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          Support Tickets
        </h2>
        <Button
          variant="default"
          size="sm"
          onClick={() => setShowCreateForm(!showCreateForm)}
          iconName="Plus"
          iconPosition="left"
        >
          Create Ticket
        </Button>
      </div>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-text-primary mb-4">Create New Support Ticket</h3>
          <div className="space-y-4">
            <Input
              label="Subject"
              type="text"
              placeholder="Brief description of your issue"
              value={newTicket.subject}
              onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                value={newTicket.category}
                onChange={(value) => setNewTicket(prev => ({ ...prev, category: value }))}
                placeholder="Select category"
                required
              />
              <Select
                label="Priority"
                options={priorityOptions}
                value={newTicket.priority}
                onChange={(value) => setNewTicket(prev => ({ ...prev, priority: value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows="4"
                placeholder="Provide detailed information about your issue"
                value={newTicket.description}
                onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="default"
                onClick={handleCreateTicket}
                iconName="Send"
                iconPosition="left"
              >
                Submit Ticket
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tickets List */}
      {supportTickets.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageCircle" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary mb-4">No support tickets found</p>
          <Button
            variant="default"
            onClick={() => setShowCreateForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Create Your First Ticket
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary">{ticket.subject}</h3>
                      <p className="text-sm text-text-secondary">{ticket.pgName}</p>
                      <p className="text-xs text-text-secondary font-mono">{ticket.ticketId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-text-secondary">Category</p>
                      <p className="font-medium text-text-primary">{ticket.category}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Created</p>
                      <p className="font-medium text-text-primary">{formatDate(ticket.createdDate)}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Last Update</p>
                      <p className="font-medium text-text-primary">{formatDate(ticket.lastUpdate)}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Responses</p>
                      <p className="font-medium text-text-primary flex items-center gap-1">
                        <Icon name="MessageSquare" size={14} />
                        {ticket.responses}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                      View Details
                    </Button>
                    {ticket.status !== 'Resolved' && ticket.status !== 'Closed' && (
                      <Button variant="ghost" size="sm" iconName="MessageCircle" iconPosition="left">
                        Add Response
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportTickets;